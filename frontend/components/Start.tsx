const Start = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-50 py-12 px-2 max-w-xl mx-auto">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-bold text-3xl">
              <p>Welcome to F and B Systems</p>
            </div>
            <p className="text-red-500 font-semibold">Aamara Technologies</p>
            <div className="flex flex-row text-sm font-medium text-gray-400 pt-6">
              <p>Enter the OTP of the regisered table to join the table</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-8 mt-5">
              <div className="flex flex-col space-y-5">
                <div>
                  <a
                    href="/login"
                    className="flex font-[500] flex-row items-center justify-center text-center w-full border rounded-lg outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    Register new to Table
                  </a>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div>
                  <a
                    href="/jointable"
                    className="flex font-[500] flex-row items-center justify-center text-center w-full border rounded-lg outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    Join a Table
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-auto mb-4 font-semibold">
        Powered by Rahil Murali
      </div>
    </div>
  );
};

export default Start;
