import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>The Booker</h1>
      <div>
        <Link to="thebooker://(tab)/book"><button>アプリに飛ばすテスト</button></Link>
      </div>
      <div>
        <Link to="/page1"><button>Go to Page 1</button></Link>
        <Link to="/page2"><button>Go to Page 2</button></Link>
        <Link to="/page3"><button>Go to Page 3</button></Link>
        <Link to="/page4"><button>Go to Page 4</button></Link>
        <Link to="/page5"><button>Go to Page 5</button></Link>
      </div>
    </div>
  );
};

export default Home;