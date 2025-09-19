import { useEffect, useState } from "react";
import { useUser } from "../../../CustomProviders/useContext";
import useUsers from "../../../hooks/useUsers";

const Profile = () => {
  const { userEmail } = useUser();
  const [users, refetch, isPending] = useUsers();

  const [findUser, setFindUser] = useState();

  // current user
  //  rabiul@bscse.uiu.ac.bd

  // users Collection useUsers
  //  sajed
  //   rabiul@bscse.uiu.ac.bd
  //  ratul
  //  fahim
  //  3arijit

  useEffect(() => {
    if (users && userEmail) {
      const currentUser = users.find((user) => user.email === userEmail);
      setFindUser(currentUser || null);
    }
  }, [userEmail, users]);

  return (
    <div className="text-white">
      <div
        className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex
                justify-between items-center"
      >
        <div>
          <div>
            <img className="w-[200px]" src={findUser?.userImage} alt="" />
          </div>
          <div>
            <p>{findUser?.username}</p>
            <p>{findUser?.email}</p>
            <p>{findUser?.createdAt}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-16">
        <div
          className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex-5/12
                justify-between items-center"
        >
          <p>Profile SetUp</p>
          <p>wallet Setup</p>
          <p>Bkash</p>
          <p>Nogad</p>
        </div>
        <div
          className=" bg-white/5
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                shadow-lg
                p-8
                text-white
                space-y-6
                z-10
                flex-1/12
                justify-between items-center"
        >
          <p>Preferences</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
