import { Link } from "react-router-dom"
import LoginButton from "../Components/UI/LoginButton";
import styles from '../Styles/scss/public.module.scss';
import { Slide } from 'react-slideshow-image';

const Public = () => {

  const images = [
    "../../assets/img/backgrounds/block.jpg",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <section className={styles.content}>
      <h1 className={styles.title}>Crypto-Tracker.com</h1>

      <div className={styles.banner} style={{}}>
        <h2>Welcome</h2>
        <Link to="/login"><LoginButton>Login</LoginButton></Link>
      </div>
    </section>

  )
}
export default Public