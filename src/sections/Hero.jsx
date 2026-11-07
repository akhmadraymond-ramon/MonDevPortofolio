
import Profilecard from "../components/Profilecard";
import Navbar from "../components/Navbar";
import TypingText from "../components/TypingText";
import Lanyard from "../components/Lanyard";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero" id="home">
            <Navbar />

            <div className="mobile-background-text">
                <div className="mobile-page-label">
                    <span>01</span>
                    <span className="home-divider">/</span>
                    <span>HOME</span>
                </div>

                <p>A personal space to explore my work, ideas, and journey.</p>
            </div>

            <div className="hero-content">

                {/* LEFT CONTENT */}
                <div className="hero-left">

                    <div className="intro-text">
                        <h1>
                            Hello, I'm Akhmad <span>Raymond</span>
                        </h1>
                    </div>

                    <p className="role-label">
                        ~ $ <span>role</span>
                    </p>

                    <TypingText />

                    <div className="social-link">

                        {/* RESUME BUTTON */}
                        <div className="resume-wrapper">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-1"
                            >
                                <span className="button-name-1">
                                    Resume
                                </span>

                                <span className="button-extra-1">
                                    Download
                                </span>

                                <span className="button-icon-1">
                                    <img
                                        src="/icons/corner-down-left.svg"
                                        className="icon-before"
                                        alt=""
                                    />

                                    <img
                                        src="/icons/download.svg"
                                        className="icon-after"
                                        alt=""
                                    />
                                </span>
                            </a>
                        </div>

                        {/* SOCIAL BUTTONS */}
                        <div className="social-buttons">

                            <a
                                href="https://github.com/akhmadraymond-ramon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-2"
                                aria-label="GitHub"
                            >
                                <span className="button-icon-2">
                                    <img
                                        src="/icons/github.svg"
                                        alt=""
                                    />
                                </span>

                                <span className="button-name-2">
                                    @akhmadraymond
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/akhmad-raymond-453614414/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-3"
                                aria-label="LinkedIn"
                            >
                                <span className="button-icon-3">
                                    <img
                                        src="/icons/linkedin.svg"
                                        alt=""
                                    />
                                </span>

                                <span className="button-name-3">
                                    akhmad raymond
                                </span>
                            </a>

                            <a
                                href="https://www.instagram.com/akhmadraymond"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-4"
                                aria-label="Instagram"
                            >
                                <span className="button-icon-4">
                                    <img
                                        src="/icons/instagram.svg"
                                        alt=""
                                    />
                                </span>

                                <span className="button-name-4">
                                    @akhmadraymond
                                </span>
                            </a>

                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="hero-right">

                    <div className="profile-desktop">
                        <Profilecard
                            name="Akhmad Raymond"
                            handle="akhmadraymondbestfriend"
                            avatarUrl="/images/mon.jpg"
                            radius={12}
                        />
                    </div>

                    <div className="lanyard-mobile">
                        <Lanyard
                            frontImage="/images/mon.jpg"
                            backImage="/icons/programming.png"
                            strapImage="/icons/linkedin-white.svg"
                            strapColor="#202020"
                            strapLength={1}
                            logoSpacing="2"
                            anchor="center"
                            finish="matte"
                            metal="graphite"
                            size={0.5}
                            orientation="portrait"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;
