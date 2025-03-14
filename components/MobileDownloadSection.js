import { useState } from 'react';
import mobileGreenSvg from './utils/svgs/mobile-green-bg.svg';
import mobilePinkSvg from './utils/svgs/mobile-pink-bg.svg';
import mobileSvg from './utils/svgs/mobile.svg';
import img from '@/images/img-1-9.webp'

const styles = {
  main: 'flex flex-col justify-between -mt-44 md:mt-0 mb-24',
  container: 'flex flex-col-reverse md:flex-row justify-between gap-2 mx-3 xl:mx-32 mb-12 md:mb-24',
  svgWrapper: 'mr-auto ml-auto md:ml-0 md:mr-0 mt-5 relative',
  pinkSvg: 'hidden lg:inline-block absolute -top-2 xl:top-5 right-0 xl:right-20',
  contentSvg: 'absolute -top-28 lg:-top-36 xl:-top-28 right-5 md:right-16 xl:right-24',
  contentWrapper: 'text-center md:text-left mr-auto ml-auto md:mr-0 md:-ml-20 xl:-ml-32 xl:mr-20 mb-28 md:mb-0',
  descriptionText: 'text-[#000000cc] font-semibold text-xl lg:text-2xl mb-8',
  formContainer: 'max-w-md mx-auto md:mx-0 w-full',
  inputWrapper: 'flex flex-col sm:flex-row gap-3 mb-4',
  input: 'flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  button: 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center',
  successMessage: 'text-green-600 font-medium animate-fadeIn',
  benefitsContainer: 'flex flex-col sm:flex-row gap-6 justify-center md:justify-start mt-10',
  benefitItem: 'flex items-start gap-3',
  benefitIcon: 'text-blue-600 w-6 h-6 mt-0.5',
  benefitText: 'text-gray-700',
  strong: 'font-semibold',
};

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send the email to your backend
      console.log('Email submitted:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset the success message after a few seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.svgWrapper}>
          <img src={mobileGreenSvg.src} alt="" />
          <img src={mobilePinkSvg.src} alt="" className={styles.pinkSvg} />
          <img src={img.src} alt="" className={styles.contentSvg} />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className="font-bold text-3xl lg:text-5xl pb-7">
            Stay Updated with Latest Deals
          </h2>
          <p className={styles.descriptionText}>
            Get exclusive offers and promotions delivered to your inbox!
          </p>
          
          <div className={styles.formContainer}>
            <form onSubmit={handleSubscribe}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.button}>
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className={styles.successMessage}>
                  Thanks for subscribing! Check your inbox soon.
                </p>
              )}
            </form>
            
            <div className={styles.benefitsContainer}>
              <div className={styles.benefitItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.benefitIcon}>
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a3.833 3.833 0 001.719-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.835 3.835 0 00-1.718-.756V8.334c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                </svg>
                <p className={styles.benefitText}>
                  <span className={styles.strong}>Exclusive deals</span> and discounts
                </p>
              </div>
              
              <div className={styles.benefitItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.benefitIcon}>
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <p className={styles.benefitText}>
                  <span className={styles.strong}>First access</span> to new products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;