import { createContext, useContext, useEffect, useState } from "react";
import {ref, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";
import { storage } from "./../db/firebase";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentUserData, setCurrentUserData] = useState({});
  const [userType, setUserType] = useState("recruiter");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentlyVisited, setRecentlyVis] = useState(["/dashboard"]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  /////////Adding recently added link////////////////////
  const handleAddRecentlyVis = (link) => {
    if (link.length > 20) {
      return;
    }

    if (recentlyVisited.includes(link)) {
      setRecentlyVis(() => [
        link,
        ...recentlyVisited.filter((l) => l !== link),
      ]);
    } else {
      setRecentlyVis((prev) => [link, ...prev]);
    }
  };

  ////////Checking if user set//////////////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  /////// UPOAL PHOTO to the Storage

  async function upload(file, user) {
    const fileRef = ref(storage, user.uid + ".png");
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(user, { photoURL })
      .then(() => {
        settingUser(user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    
  ////////////Setting current user/////////////////  
  function settingUser(id) {
    setLoading(true);
    const currentUserDataRef = doc(db, userType, id);
    const getUserData = async () => {
      const docSnap = await getDoc(currentUserDataRef);
      if (docSnap.exists()) {
        setCurrentUserData(docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        const currentUserDataRef = doc(db, "employee", id);
        const docSnap = await getDoc(currentUserDataRef);
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data());
          setLoading(false);
        } else {
          console.log("No such user!");
        }
      }
    };
    getUserData();
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        loginUser,
        user,
        logout,
        currentUserData,
        setUserType,
        userType,
        loading,
        setLoading,
        upload,
        settingUser,
        isSidebarOpen,
        setIsSidebarOpen,
        recentlyVisited,
        handleAddRecentlyVis,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
