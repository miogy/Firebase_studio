function User({ user }) {
  return (
    <div className="flex items-center shrink-0">
      <img
        className="w-10 h-10 rounded-full mr-2 "
        src={user.photoURL}
        alt={user.displayName}
        referrerPolicy="no-referrer"
      />
      <span className="hidden md:block">{user.displayName}</span>
    </div>
  );
}
export default User;
