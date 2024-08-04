import addToMailingList from "@/actions/addToMailingList";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-[#fff6ba] dark:bg-base-200 text-slate-950 dark:text-base-content">
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
      <nav>
        <h6 className="footer-title">Learn More</h6>
        <a
          className="link link-hover"
          href="https://daviscommunitymeals.org/events/"
          target="_blank"
          rel="noreferrer"
        >
          Events
        </a>
        <a
          className="link link-hover"
          href="https://daviscommunitymeals.org/news/"
          target="_blank"
          rel="noreferrer"
        >
          News
        </a>
        <a
          className="link link-hover"
          href="https://paulsplacedavis.org/"
          target="_blank"
          rel="noreferrer"
        >
          Paul&apos;s Place
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
              className="input border-1 border-slate-400 bg-[#fcfbe3] text-slate-950 dark:bg-base-200 join-item"
            />
            <button
              type="submit"
              className="btn border-slate-400 bg-yellow-200 dark:bg-indigo-600 { NavLink } from 'react-router-dom' text-slate-950 dark:btn-primary join-item"
            >
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
