import * as React from 'react';
import Link from 'next/link';

import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href='/'>
        <a>MyMDb</a>
      </Link>
      <Link href='/movies'>
        <a>Movies</a>
      </Link>
      <Link href='/tv'>
        <a>TV</a>
      </Link>
    </nav>
  );
};

export default Navbar;
