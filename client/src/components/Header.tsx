

const header = () => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="font-bold text-4xl">MyBlog</h1>
        </div>
        <div className="flex justify-between w-40 font-medium text-lg">
          <p>Login</p>
          <p>Register</p>
        </div>
      </header>
    </>
  );
};

export default header;
