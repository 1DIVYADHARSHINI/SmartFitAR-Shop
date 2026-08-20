import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const unread = notifications.filter(
      (n) => n.userEmail === user.email && !n.read
    );

    setCount(unread.length);
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/notifications")}
    >
      <Bell />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
