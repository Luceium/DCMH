import addToMailingList from "@/actions/addToMailingList";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-secondary dark:bg-secondary text-secondary-content dark:text-secondary-content">
      <nav>
        <h6 className="footer-title">Davis Community Meals & Housing</h6>
        <a
          className="link link-hover"
          href="https://daviscommunitymeals.org/about/"
          target="_blank"
          rel="noreferrer"
        >
          About Us
        </a>
        <a
          className="link link-hover"
          href="https://daviscommunitymeals.org/contact-us/"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
        <a
          className="link link-hover"
          href="https://daviscommunitymeals.org/volunteer/"
          target="_blank"
          rel="noreferrer"
        >
          Volunteer
        </a>
      </nav>
      <form
        action={async (formData: FormData) => {
          "use server";
          addToMailingList(formData.get("email") as string);
        }}
      >
        <h6 className="footer-title">Mailing List</h6>
        <fieldset className="form-control w-80">
          <label className="label">
            <span>Enter your email address to join our mailing list!</span>
          </label>
          <div className="join">
            <input
              type="text"
              name="email"
              placeholder="username@site.com"
              className="input border-1 bg-secondaryDark text-neutral-content dark:bg-secondaryDark join-item"
            />
            <button type="submit" className="btn join-item bg-accent">
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
