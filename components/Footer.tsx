const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <nav>
        <h6 className="footer-title">Davis Community Meals & Housing</h6>
        <a className="link link-hover" href="https://daviscommunitymeals.org/about/" target="_blank" rel="noreferrer">About Us</a>
        <a className="link link-hover" href="https://daviscommunitymeals.org/contact-us/" target="_blank" rel="noreferrer">Contact</a>
        <a className="link link-hover" href="https://daviscommunitymeals.org/volunteer/" target="_blank" rel="noreferrer">Volunteer</a>
      </nav>
      <nav>
        <h6 className="footer-title">Learn More</h6>
        <a className="link link-hover" href="https://daviscommunitymeals.org/events/" target="_blank" rel="noreferrer">Events</a>
        <a className="link link-hover" href="https://daviscommunitymeals.org/news/" target="_blank" rel="noreferrer">News</a>
        <a className="link link-hover" href="https://paulsplacedavis.org/" target="_blank" rel="noreferrer">Paul&apos;s Place</a>
      </nav>
      <form>
        <h6 className="footer-title">Mailing List</h6> 
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address tojoin our mailing list!</span>
          </label> 
          <div className="join">
            <input type="text" placeholder="username@site.com" className="input input-bordered join-item"/> 
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
