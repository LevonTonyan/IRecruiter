import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from 'firebase/auth'
import { auth, db } from '../db/firebase';
import { getDoc, doc, } from 'firebase/firestore'




const UserContext = createContext();


export const AuthContextProvider = ({ children }) => { 

    const [user, setUser] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});
    const [userType, setUserType] = useState('recruiter');
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen ] = useState(false)

    
    

    const createUser = (email, password) => { 
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const loginUser = (email, password) => { 
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => { 
        return signOut(auth)
    }


    ////////Checking if user set//////////////
    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);  
        })
        return () => unsubscribe();
    }, [])
    

    function settingUser(id) { 
        setLoading(true)
        const currentUserDataRef = doc(db, userType, id)
       console.log(userType, "The id is: ", id)
        const getUserData = async() => { 
            const docSnap = await getDoc(currentUserDataRef)
            if (docSnap.exists()) {
                setCurrentUserData(docSnap.data())
                setLoading(false)
              } else {
                // doc.data() will be undefined in this case
                const currentUserDataRef = doc(db, 'employee', id)
                const docSnap = await getDoc(currentUserDataRef)
                if (docSnap.exists()) {
                    setCurrentUserData(docSnap.data())
                    setLoading(false)
                } else { 
                    console.log("No such user!");
                }
              }
        }
        getUserData()
       
       
    }


    return (
        <UserContext.Provider value={{
            createUser,
            loginUser,
            user, logout,
            currentUserData,
            setUserType,
            userType,
            loading,
            settingUser,
            isSidebarOpen,
            setIsSidebarOpen
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => { 
    return useContext(UserContext)
}

