---
#
---

// Cookies

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    
function consentGranted() {
    gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
}

// Analytics
    
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
});

if(readCookie('cookie-consent')=='true') {
    consentGranted();
} else if(readCookie('cookie-consent')=='false') {
    ;    
} else {
    document.getElementById('cookie-notice').style.display = 'block';
};

const script = document.createElement('script');
script.src = 'https://www.googletagmanager.com/gtag/js?id={{ site.ga4 }}';
script.async = true;
document.body.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '{{ site.ga4 }}');

// Cookie notice

document.getElementById('cookie-notice-accept').addEventListener("click",function() {
    createCookie('cookie-consent','true',365);
    consentGranted();
    document.getElementById('cookie-notice').style.display = 'none';
});

document.getElementById('cookie-notice-reject').addEventListener("click",function() {
    createCookie('cookie-consent','false',30);
    document.getElementById('cookie-notice').style.display = 'none';
});

document.getElementById('cookie-notice-close').addEventListener("click",function() {
    document.getElementById('cookie-notice').style.display = 'none';
});

// Viewport fix 

const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();