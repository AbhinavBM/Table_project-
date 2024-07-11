const Loading = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="element-wrapper">
          <div className="element"></div>
          <div className="element"></div>
          <div className="element"></div>
          <div className="loading">Loading…</div>
          <div className="large-square"></div>
      </div>
    </div>
  );
};

export default Loading;
