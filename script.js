document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const homeScreen = document.getElementById("home-screen");
    const progressFill = document.getElementById("progress-fill");
    const loadStatus = document.getElementById("load-status");
    const timeDisplay = document.getElementById("current-time");
    const langToggle = document.getElementById("lang-toggle");
    const sendRequestBtn = document.getElementById("send-request-btn");
  
    function updateClock() {
        if (!timeDisplay) return;
        const now = new Date();
        timeDisplay.innerText = now.getHours().toString().padStart(2,'0') + ':' + 
                               now.getMinutes().toString().padStart(2,'0') + ':' + 
                               now.getSeconds().toString().padStart(2,'0');
    }
    setInterval(updateClock, 1000); 
    updateClock();

    let currentLang = "uk";
    const langData = {
        uk: { greet: "Оберіть Послугу", badge: "ГВАРДІЯ ТА КОНСАЛТИНГ", alert: "Шановний Mykyta, ваш запит надіслано в ПВК Cerberus.", book: "Заявку прийнято! Менеджер зв'яжеться з вами." },
        en: { greet: "Select Service", badge: "DEFENSE & CONSULTING", alert: "Dear Mykyta, your request has been safely transmitted.", book: "Application received! Manager will contact you shortly." }
    };

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            currentLang = currentLang === "uk" ? "en" : "uk";
            langToggle.innerText = currentLang === "uk" ? "UKR" : "ENG";
            document.querySelectorAll("[data-lang-uk]").forEach(el => el.innerText = el.getAttribute("data-lang-" + currentLang));
            if (document.querySelector(".user-greet")) document.querySelector(".user-greet").innerText = langData[currentLang].greet;
            if (document.querySelector(".contract-badge")) document.querySelector(".contract-badge").innerText = langData[currentLang].badge;
        });
    }

    let progress = 0;
    const loadInterval = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            if (progressFill) progressFill.style.width = progress + "%";
            if (loadStatus) {
                loadStatus.innerText = (langToggle && langToggle.innerText === "ENG") 
                    ? "CONNECTING TO SATELLITE... (" + progress + "%)" 
                    : "ПІДКЛЮЧЕННЯ ДО СУПУТНИКА... (" + progress + "%)";
            }
        } else {
            clearInterval(loadInterval);
    
            if (splashScreen) { 
                splashScreen.style.opacity = "0"; 
                splashScreen.style.visibility = "hidden"; 
                splashScreen.style.pointerEvents = "none"; 
            }
            if (homeScreen) { 
                homeScreen.style.opacity = "1"; 
                homeScreen.style.visibility = "visible"; 
            }
        }
    }, 20);

    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", (e) => { e.stopPropagation(); alert(langData[currentLang].book); });
    });

    if (sendRequestBtn) {
        sendRequestBtn.addEventListener("click", () => {
            const name = document.getElementById("form-name").value;
            const msg = document.getElementById("form-msg").value;
            if (!name || !msg) { alert(currentLang === "uk" ? "❌ Заповніть усі поля!" : "❌ Fill all fields!"); return; }
            alert(langData[currentLang].alert);
            document.getElementById("form-name").value = ""; 
            document.getElementById("form-msg").value = "";
        });
    }

    const tabItems = document.querySelectorAll(".tab-bar .tab-item");
    const screens = [
        document.getElementById("view-services"), 
        document.getElementById("view-training"), 
        document.getElementById("view-contact")
    ];
    
    tabItems.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabItems.forEach(t => t.classList.remove("active")); 
            tab.classList.add("active");
            screens.forEach(s => { if (s) s.classList.remove("active"); });
            if (screens[index]) screens[index].classList.add("active");
        });
    });
});
