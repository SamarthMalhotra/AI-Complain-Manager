import "./Brand.css";

const Brands = () => {
  return (
    <div className="brand-container">
      <div className="brand-track">
        <div className="brand-slide">
          {/* original */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" />
          <img src="https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-2003.png" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" />

          {/* duplicate */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" />
          <img src="https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-2003.png" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
