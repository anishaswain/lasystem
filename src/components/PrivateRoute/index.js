import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Detail from "../Detail";

export default function PrivateRoute() {
  const [user, setUserData] = useState({});
  const userData = useSelector((state) => state.current);

  let { id } = useParams();

  useEffect(() => {
    setUserData(userData);
  }, [id]);

  if (userData.user === "") {
    return <Navigate to="/" />;
  } else {
    return <Detail user={user} />;
  }
}
