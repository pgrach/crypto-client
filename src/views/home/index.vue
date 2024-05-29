<script setup>
import { ref, onMounted } from 'vue'
// import Sticky from 'sticky-js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, Mousewheel } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'vue-router';
import axios from 'axios';

const modules = [Pagination, Navigation, Autoplay]
const featuresModules = [Mousewheel, Navigation, Pagination, Autoplay]

const refEra = ref(null)
const refBenefits = ref(null)
const refLine = ref(null)
const refCapabilities = ref(null)
const refFeatures = ref(null)
const refJoin = ref(null)
const refSlides = ref(null)

const burgerActive = ref(false)
const email = ref('')

function scrollTo(view) {
    view.scrollIntoView({ behavior: 'smooth' })
}

function scrollToWithDelay(view) {
    setTimeout(() => {
        view.scrollIntoView({behavior: 'smooth'})
    }, 1200)
}

function scrollOnVerticalSwipe() {
    refSlides?.value?.scrollIntoView({behavior: 'smooth'})
}

// new Sticky('.home-navigation');

const activeLink = ref('era');

function handleScroll(e) {
    const scrollPos = e.target.scrollTop;
    if (scrollPos > 0 && scrollPos < 1000) {
        activeLink.value = 'era'
    } else if (scrollPos >= 1000 && scrollPos < 2000) {
        activeLink.value = 'features'
    } else if (scrollPos >= 2000 && scrollPos < 3400) {
        activeLink.value = 'benefits'
    } else {
        activeLink.value = 'join'
    }
}

const router = useRouter();

const routeToDashboard = () => {
    router.push({ name: "dashboard" });
}

const routetoAccessForm = () => {
  router.push({ path: "/access-form" });
}

const routeToNews = () => {
  router.push({ path: "/news" });
}

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const showEmailError = ref(false);
const showEmailSuccess = ref(false);

const sendDemoEmail = () => {
    const host = import.meta.env.VITE_APP_API_HOST;
    const endpoint = 'send_demo_email';

    if (validateEmail(email.value)) {
      showEmailError.value = false;
      axios.post(`${host}${endpoint}`, {"email_address": email.value})
          .then(() => {
            email.value = '';
            showEmailSuccess.value = true;
          })
          .catch(function (error) {
            console.log('Sending Demo Email Error: ', error);
          });
    } else {
      showEmailError.value = true;
    }
}


</script>

<template>
  <div class="home" @scroll.passive="handleScroll">

    <div class="home-nav-burger-container">
      <div class="home-nav-burger" :class="{ 'home-nav-burger_active': burgerActive }" @click="burgerActive = !burgerActive">
        <span class="home-nav-burger-line-1"></span>
        <span class="home-nav-burger-line-2"></span>
        <span class="home-nav-burger-line-3"></span>
      </div>
    </div>

    <Transition>
      <ul v-if="burgerActive" class="home-navigation_mobile">
        <li class="home-nav-mobile" @click="scrollTo(refEra)">The AiDala era</li>
        <li class="home-nav-mobile" @click="scrollTo(refFeatures)">Features</li>
        <li class="home-nav-mobile" @click="scrollTo(refBenefits)">Benefits</li>
        <li class="home-nav-mobile" @click="scrollTo(refJoin)">Join AiDala</li>
        <li class="home-nav-mobile" @click="routeToNews()">News</li>
      </ul>
    </Transition>


    <div class="home-gradient">
      <div class="home-gradient__block"></div>
    </div>

    <div ref="refEra" class="home-logo">
      <img src="../../assets/img/logo_aidala.svg" alt="AiDala Logo">
    </div>
    <h1 class="home-title">Welcome to <span class="home-title__name">AiDala</span></h1>
    <div class="home-description__container">
      <h2 class="home-description">
        Advanced Technology Engineered for Bitcoin Mining Operations
      </h2>
    </div>

    <nav class="home-navigation" data-margin-top="20">
      <ul class="home-navs">
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'era' }" @click="scrollTo(refEra)">The AiDala era</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'features' }" @click="scrollTo(refFeatures)">Features</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'benefits' }" @click="scrollTo(refBenefits)">Benefits</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'join' }" @click="scrollTo(refJoin)">Join AiDala</li>
        <li class="home-nav" @click="routeToNews()">News</li>
      </ul>
    </nav>

    <div class="home-features" ref="refFeatures">

      <div class="home-features-gradient"></div>

      <div class="home-features-title-container">
        <h2 class="home-features-title">
          Features for Bitcoin Mining
        </h2>
      </div>

      <div class="home-features-container" ref="refSlides">
        <swiper
            :direction="'horizontal'"
            :navigation="{
              enabled: true,
              nextEl: '.home-features-slider-next',
              prevEl: '.home-features-slider-prev'
            }"
            :height="1207"
            :speed="600"
            :slidesPerView="1"
            :spaceBetween="30"
            :mousewheel="false"
            :loop="true"
            :modules="featuresModules"
            class="mySwiper"
        >
          <swiper-slide>
            <div class="home-features-block">
              <div class="home-features-block-text">
                <div>
                  <h3 class="home-features-block-text-title">
                    Mining Risk Assessment Package
                  </h3>
                  <p class="home-features-block-text-content">
                    Our system continuously analyzes every aspect of Bitcoin mining operations to reveal current and future financial performance metrics. This empowers our partners to make informed investment decisions based on precise data, while others rely on estimations..
                  </p>
                </div>
              </div>
              <div class="home-features-block-img">
                <img src="../../assets/img/home-features-1.png" alt="Features Image">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="home-features-block">
              <div class="home-features-block-text">
                <div>
                  <h3 class="home-features-block-text-title">
                    Foundation Package
                  </h3>
                  <p class="home-features-block-text-content">
                    An AI-driven educational guide, complemented by real-time news, market updates, and cryptocurrency valuations.
                  </p>
                </div>
              </div>
              <div class="home-features-block-img">
                <img src="../../assets/img/home-features-2.png" alt="Features Image">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="home-features-block">
              <div class="home-features-block-text">
                <div>
                  <h3 class="home-features-block-text-title">
                    Gross Margin and other KPI Planning
                  </h3>
                  <p class="home-features-block-text-content">
                    Test your strategies against historical data with AiDala's backtesting software.
                    Pinpoint opportunities with optimal risk-reward ratios
                  </p>
                </div>
              </div>
              <div class="home-features-block-img">
                <img src="../../assets/img/home-features-3.png" alt="Features Image">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="home-features-block">
              <div class="home-features-block-text">
                <div>
                  <h3 class="home-features-block-text-title">
                    Pro Trader Package
                  </h3>
                  <p class="home-features-block-text-content">
                    For the experienced traders, implement advanced trading strategies with our expert-level tools designed for cutting-edge capabilities.
                  </p>
                </div>
              </div>
              <div class="home-features-block-img">
                <img src="../../assets/img/home-features-4.png" alt="Features Image">
              </div>
            </div>
          </swiper-slide>

          <div class="home-features-slider-prev home-features-slider-arrow">
            <img src="../../assets/img/swiper-prev.svg" alt="Swiper Prev">
          </div>
          <div class="home-features-slider-next home-features-slider-arrow">
            <img src="../../assets/img/swiper-next.svg" alt="Swiper Next">
          </div>

        </swiper>

      </div>

      <div class="home-features-container__mobile">
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Mining Risk Assessment Package
              </h3>
              <p class="home-features-block-text-content">
                Our system continuously analyzes every aspect of Bitcoin mining operations to reveal current and future financial performance metrics. This empowers our partners to make informed investment decisions based on precise data, while others rely on estimations..
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-1.png" alt="Features Image">
          </div>
        </div>
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Foundation Package
              </h3>
              <p class="home-features-block-text-content">
                An AI-driven educational guide, complemented by real-time news, market updates, and cryptocurrency valuations.
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-2.png" alt="Features Image">
          </div>
        </div>
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Gross Margin and other KPI Planning
              </h3>
              <p class="home-features-block-text-content">
                Test your strategies against historical data with AiDala's backtesting software.
                Pinpoint opportunities with optimal risk-reward ratios
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-3.png" alt="Features Image">
          </div>
        </div>
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Pro Trader Package
              </h3>
              <p class="home-features-block-text-content">
                For the experienced traders, implement advanced trading strategies with our expert-level tools designed for cutting-edge capabilities.
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-4.png" alt="Features Image">
          </div>
        </div>
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Technical Analysis 
              </h3>
              <p class="home-features-block-text-content">
                Dive into the world of technical analysis with AiDala's tools, featuring indicators like moving averages,
                RSI, MACD, and Bollinger Bands. Tailor your analysis to align with your trading style.
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-5.png" alt="Features Image">
          </div>
        </div>
        <div class="home-features-block">
          <div class="home-features-block-text">
            <div>
              <h3 class="home-features-block-text-title">
                Market Scanners and Screeners: AiDala alongside Trade Ideas
              </h3>
              <p class="home-features-block-text-content">
                Effortlessly filter stocks and instruments based on specific criteria with AiDala's
                market scanners and screeners, adding an extra layer of precision to your trading decisions.
              </p>
            </div>
          </div>
          <div class="home-features-block-img">
            <img src="../../assets/img/home-features-6.png" alt="Features Image">
          </div>
        </div>
      </div>
    </div>

    <div class="home-benefits" ref="refBenefits">
      <h2 class="home-benefits-title">Our key benefits</h2>
      <div class="home-benefits-slider-container">

        <div class="home-benefits-main">
          <swiper
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :pagination="{
              type: 'progressbar',
              el: '.home-benefits-slider-progress',
              horizontalClass: '.home-benefits-slider-progress',
              progressbarFillClass: 'home-benefits-slider-progress-fill'
            }"
            :navigation="{
              enabled: true,
              nextEl: '.home-benefits-slider-next',
              prevEl: '.home-benefits-slider-prev'
            }"
            :loop="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide>
              <div class="home-benefits-slider">
                <div class="home-benefits-text">
                  <h3 class="home-benefits-text__title">
                    Personalized User Experience: Your Trading, Your Way
                  </h3>
                  <p class="home-benefits-text__description">
                    AiDala leverages intelligent algorithms to deliver insights and recommendations that resonate with your unique goals and risk preferences.
                  </p>
                </div>
                <div class="home-benefits-img">
                  <img src="../../assets/img/benefits-slide-1.png" alt="Benefits Image">
                  <div class="home-benefits-slider-gradient__mobile"></div>
                </div>
                <div class="home-benefits-slider-gradient"></div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="home-benefits-slider">
                <div class="home-benefits-text">
                  <h3 class="home-benefits-text__title">
                    Unparalleled Data Security and Privacy: Your Trust, Our Priority
                  </h3>
                  <p class="home-benefits-text__description">
                    Trust AIDALA for robust security measures and transparent data usage practices. We prioritize your data security and privacy without compromising on the convenience you deserve.
                  </p>
                </div>
                <div class="home-benefits-img">
                  <img src="../../assets/img/benefits-slide-2.png" alt="Benefits Image">
                  <div class="home-benefits-slider-gradient__mobile"></div>
                </div>
                <div class="home-benefits-slider-gradient"></div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="home-benefits-slider">
                <div class="home-benefits-text">
                  <h3 class="home-benefits-text__title">
                    Seamless Integration with Existing Tools: Unmatched Convenience
                  </h3>
                  <p class="home-benefits-text__description">
                    Integrate AIDALA seamlessly with leading crypto trading platforms. Experience unmatched convenience and ease of use, eliminating the hassle of separate interfaces and manual data transfer.
                  </p>
                </div>
                <div class="home-benefits-img">
                  <img src="../../assets/img/benefits-slide-3.png" alt="Benefits Image">
                  <div class="home-benefits-slider-gradient__mobile"></div>
                </div>
                <div class="home-benefits-slider-gradient"></div>
              </div>
            </swiper-slide>

            <div class="home-benefits-slider-prev home-benefits-slider-arrow">
              <img src="../../assets/img/swiper-prev.svg" alt="Swiper Prev">
            </div>
            <div class="home-benefits-slider-next home-benefits-slider-arrow">
              <img src="../../assets/img/swiper-next.svg" alt="Swiper Next">
            </div>

            <div class="home-benefits-slider-progress">
              <div class="home-benefits-slider-progress-fill"></div>
            </div>
          </swiper>
        </div>
      </div>
    </div>

<!--    <div class="home-graph" ref="refCapabilities">-->
<!--      <div class="home-graph-title-container">-->
<!--        <h2 class="home-graph-title">-->
<!--          <span class="home-graph-title__name">AiDala</span>: Innovation meets personalized excellence in the world of cryptoeconomics-->
<!--        </h2>-->
<!--      </div>-->
<!--      <div class="home-graph-main-container">-->
<!--        <div class="home-graph-main">-->
<!--          <div class="home-graph-main-high">-->
<!--            <div class="home-graph-main-high-title"><span class="home-graph-main-high-title_gradient">AiDala</span></div>-->
<!--            <div class="home-graph-main-high-value"><span class="home-graph-main-high-value_gradient">90.0%</span></div>-->
<!--          </div>-->

<!--          <div ref="refLine" class="home-graph-main-line"></div>-->
<!--          <div class="home-graph-img">-->
<!--            <img src="../../assets/img/home-graph.png" alt="">-->
<!--          </div>-->
<!--          <div class="home-graph-img_mobile">-->
<!--            <img src="../../assets/img/home-graph_mobile.png" alt="">-->
<!--          </div>-->

<!--          <div class="home-graph-main-left">-->
<!--            <div class="home-graph-main-left-value">86.4%</div>-->
<!--            <div class="home-graph-main-left-description">5-shot* (reported) Previous SOTA (GPT-4)</div>-->
<!--            <div class="home-graph-main-left-hint">*Note that evaluations of previous SOTA models use different prompting techniques.</div>-->
<!--          </div>-->

<!--          <div class="home-graph-main-right">-->
<!--            <p>-->
<!--              Benefit from superior data quality and relevance. AIDALA's advanced data pre-processing pipelines, incorporating contextual-->
<!--              information and feature engineering, ensure an unparalleled depth of analysis that competitors struggle to match.-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="home-join" ref="refJoin">

      <div class="home-join-gradient"></div>
      <div class="home-join-gradient-2"></div>

      <div class="home-join-title-container">
        <h2 class="home-join-title">
          Join AiDala Today
        </h2>
      </div>
      <div class="home-join-description-container">
        <h2 class="home-join-description">
          The AI-driven insights we offer are unparalleled in the industry. This significantly amplifies our partners' mining capabilities, putting them ahead while others remain in the dark
        </h2>
      </div>
      <div>
        <div class="home-join-btns-container">
          <div class="home-join-btns">
            <button class="home-btn" @click="routeToDashboard()">Start</button>
            <button class="home-btn home-btn__outline" @click="routetoAccessForm()">Join Beta</button>
          </div>
        </div>
      </div>
    </div>

    <div class="home-book-demo-container">
      <div class="home-book-demo">
        <div class="home-book-demo-content">
          <h3 class="home-book-demo-title">
            Book your demo now
          </h3>
          <div class="home-book-demo-description">
            Stay at the forefront of innovation with our commitment to continuous research and development.
          </div>
          <div class="home-book-demo-input home-input">
            <input type="email" placeholder="Email" v-model="email">
            <span class="home-input-arrow" @click="sendDemoEmail()">
              <img src="../../assets/img/input-arrow.svg" alt="Input Arrow">
            </span>
            <div v-if="showEmailError" class="home-input__info">Please type valid Email</div>
            <div v-if="showEmailSuccess" class="home-input__info">Successfully sent</div>
          </div>
        </div>

        <div class="home-book-demo-img">
          <img src="../../assets/img/book-img.svg" alt="Book Your Demo Image">
        </div>
      </div>
    </div>

    <footer class="home-footer-container">
      <div class="home-footer">
        <div class="home-footer-link">
          AiDala.uk
        </div>
        <div class="home-footer-linkedin">
          <a href="https://www.linkedin.com/company/aidala-inc/about/" target="_blank">
            <img src="../../assets/img/linkedin_square.svg" alt="Linkedin Image">
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
