import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useGetTokenMutation, useGetUserMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice";
import { setProfile } from "../features/user/userSlice";
import { useFirstRender } from '../hooks/useFirstRender.js';
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import { useState } from "react";


const Layout = () => {


  // const token = useSelector(selectCurrentToken);
  // const user = useSelector(selectCurrentUser);
  // const [isLoading, setIsLoading] = useState(true);

  // const [getToken, { error }] = useGetTokenMutation();
  // const [getUser, { error: userError }] = useGetUserMutation();

  // const dispatch = useDispatch();

  // useEffect(() => {

  //   getToken()
  //     .then(
  //       (userData) => {

  //         dispatch(setCredentials({ ...userData, }));
  //         debugger
  //         return getUser();
  //       }
  //     )
  //     .then(
  //       (user) => {

  //         dispatch(setProfile({ ...user }));
  //         setIsLoading(false);
  //       }
  //     ).catch((userError) => {
  //       console.log(userError)
  //     })

  // }, [])

  const content = <Outlet />;

  return content;
}

export default Layout;