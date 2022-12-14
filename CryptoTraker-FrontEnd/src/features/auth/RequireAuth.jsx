import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useGetTokenMutation, useGetUserMutation } from "./authApiSlice";
import { selectCurrentUser } from "../user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { setProfile } from "../user/userSlice";

const RequireAuth = () => {

  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(true);

  const [getToken] = useGetTokenMutation();
  const [getUser] = useGetUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    getToken()
      .then(
        (userData) => {

          dispatch(setCredentials({ ...userData, }));

          if ('error' in userData) {
            navigate('/login')
          }
          return getUser();

        }
      )
      .then(
        (user) => {

          dispatch(setProfile({ ...user }));
          setIsLoading(false);
        }
      ).catch((userError) => {
        console.log(userError)
      })

  }, [])


  return (
    isLoading
      ? <h1>Loading</h1>
      : <Outlet />
  )
}
export default RequireAuth