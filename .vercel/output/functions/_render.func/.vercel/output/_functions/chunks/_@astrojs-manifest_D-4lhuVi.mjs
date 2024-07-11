import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_BowEOSYj.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"auth/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"auth/register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/register","isIndex":false,"type":"page","pattern":"^\\/auth\\/register\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/register.astro","pathname":"/auth/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"auth/registergoogle/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/registergoogle","isIndex":false,"type":"page","pattern":"^\\/auth\\/registergoogle\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"registergoogle","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/registergoogle.astro","pathname":"/auth/registergoogle","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard/admin","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/admin\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/admin/index.astro","pathname":"/dashboard/admin","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/security/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard/security","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/security\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/security.astro","pathname":"/dashboard/security","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/shipments/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard/shipments","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/shipments\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"shipments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/shipments/index.astro","pathname":"/dashboard/shipments","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/trackeo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard/trackeo","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/trackeo\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"trackeo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/trackeo.astro","pathname":"/dashboard/trackeo","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/index.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"faqs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/faqs","isIndex":false,"type":"page","pattern":"^\\/faqs\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs.astro","pathname":"/faqs","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"new-shipment/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/new-shipment","isIndex":false,"type":"page","pattern":"^\\/new-shipment\\/?$","segments":[[{"content":"new-shipment","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/new-shipment.astro","pathname":"/new-shipment","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.jTC10Yys.css"}],"routeData":{"route":"/dashboard/shipments/[shipid]","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/shipments\\/([^/]+?)\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"shipments","dynamic":false,"spread":false}],[{"content":"shipId","dynamic":true,"spread":false}]],"params":["shipId"],"component":"src/pages/dashboard/shipments/[shipId].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/dashboard/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/dashboard/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/auth/login.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/auth/register.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/auth/registergoogle.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/dashboard/admin/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/dashboard/security.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/dashboard/shipments/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/dashboard/trackeo.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/faqs.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/pages/new-shipment.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/auth/login@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/auth/register@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/auth/registergoogle@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/dashboard/admin/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/dashboard/security@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/dashboard/shipments/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/dashboard/trackeo@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/faqs@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/new-shipment@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/auth/register@_@astro":"pages/auth/register.astro.mjs","\u0000@astro-page:src/pages/auth/registergoogle@_@astro":"pages/auth/registergoogle.astro.mjs","\u0000@astro-page:src/pages/dashboard/admin/index@_@astro":"pages/dashboard/admin.astro.mjs","\u0000@astro-page:src/pages/dashboard/security@_@astro":"pages/dashboard/security.astro.mjs","\u0000@astro-page:src/pages/dashboard/shipments/[shipId]@_@astro":"pages/dashboard/shipments/_shipid_.astro.mjs","\u0000@astro-page:src/pages/dashboard/shipments/index@_@astro":"pages/dashboard/shipments.astro.mjs","\u0000@astro-page:src/pages/dashboard/trackeo@_@astro":"pages/dashboard/trackeo.astro.mjs","\u0000@astro-page:src/pages/dashboard/index@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/faqs@_@astro":"pages/faqs.astro.mjs","\u0000@astro-page:src/pages/new-shipment@_@astro":"pages/new-shipment.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_CaTORmfI.mjs","/src/pages/404.astro":"chunks/404_3ducDNV5.mjs","/src/pages/about.astro":"chunks/about_C9vU34yG.mjs","/src/pages/auth/login.astro":"chunks/login_ENXBOFmC.mjs","/src/pages/auth/register.astro":"chunks/register_CqQB8DfC.mjs","/src/pages/auth/registergoogle.astro":"chunks/registergoogle_DdXbZuE8.mjs","/src/pages/dashboard/admin/index.astro":"chunks/index_CDL74XvT.mjs","/src/pages/dashboard/security.astro":"chunks/security_B2uQrT6e.mjs","/src/pages/dashboard/shipments/[shipId].astro":"chunks/_shipId__Cf0YNCYA.mjs","/src/pages/dashboard/shipments/index.astro":"chunks/index_Bg_hsOIX.mjs","/src/pages/dashboard/trackeo.astro":"chunks/trackeo_CRvi6esB.mjs","/src/pages/dashboard/index.astro":"chunks/index_G73k2yZC.mjs","/src/pages/faqs.astro":"chunks/faqs_NO1bAaQH.mjs","/src/pages/new-shipment.astro":"chunks/new-shipment_B_XC03QI.mjs","/src/pages/index.astro":"chunks/index_BpKNAU8K.mjs","\u0000@astrojs-manifest":"manifest_D7US6S0p.mjs","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/AdminDashboard":"_astro/AdminDashboard.De3VSUHJ.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/secondary/Accordion":"_astro/Accordion.C1B2fLhP.js","/astro/hoisted.js?q=0":"_astro/hoisted.DomCsGkk.js","/astro/hoisted.js?q=2":"_astro/hoisted.Bux5OFA6.js","/astro/hoisted.js?q=4":"_astro/hoisted.x0Ft8Fmp.js","/astro/hoisted.js?q=1":"_astro/hoisted.DcWh3YqM.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/UlNavBar":"_astro/UlNavBar.CZVmDIkh.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/UserSecurity":"_astro/UserSecurity.CN0AMjy6.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/FormLogin":"_astro/FormLogin.D9WE4Cfj.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/Shipment":"_astro/Shipment.BolMIqj2.js","/astro/hoisted.js?q=3":"_astro/hoisted.B__SPioG.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/UserShipments":"_astro/UserShipments.BUvNbygr.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/ShipmentProgress":"_astro/ShipmentProgress.BdjhbEf_.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/QuoteShipping":"_astro/QuoteShipping.BMX2HhfS.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/SelectForm":"_astro/SelectForm.C0H2QA_W.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/SideMenu":"_astro/SideMenu.LyKGE26O.js","react-toastify":"_astro/_astro-entry_react-toastify.CJU19mtT.js","/astro/hoisted.js?q=5":"_astro/hoisted.Oozc_hRb.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/RegisterGoogle":"_astro/RegisterGoogle.D10TzbJZ.js","C:/Users/Fati/Desktop/Proyecto Final Front-end/Expreso-Rivadavia-FrontEnd/src/components/UserInfoDashboard":"_astro/UserInfoDashboard.BPZ9QJ4o.js","@astrojs/react/client.js":"_astro/client.E677JtKR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.jTC10Yys.css","/_astro/about.BbJz9oRS.css","/banner.png","/favicon.png","/logo.png","/mendoza.png","/svgs/arrowDown.svg","/svgs/camion2.svg","/svgs/facebook.svg","/svgs/instagram.svg","/svgs/userInfo.svg","/fonts/Poppins-Bold.ttf","/fonts/Poppins-Regular.ttf","/fonts/Quicksand-Regular.ttf","/_astro/Accordion.C1B2fLhP.js","/_astro/AdminDashboard.De3VSUHJ.js","/_astro/auth.ChIf8Puy.js","/_astro/Button.T5o0TRFc.js","/_astro/client.E677JtKR.js","/_astro/formik.esm.C2D3lyQ3.js","/_astro/FormLogin.D9WE4Cfj.js","/_astro/hoisted.Bux5OFA6.js","/_astro/hoisted.B__SPioG.js","/_astro/hoisted.DcWh3YqM.js","/_astro/hoisted.DomCsGkk.js","/_astro/hoisted.Oozc_hRb.js","/_astro/hoisted.x0Ft8Fmp.js","/_astro/iconBase.Dh1Tc97b.js","/_astro/index.CPVBLUwE.js","/_astro/index.CZlPm10g.js","/_astro/index.D0FmFtl_.js","/_astro/Input.BieRLi0Z.js","/_astro/jsx-runtime.D5qyYPMi.js","/_astro/LoginGoogle.C0XpkFUc.js","/_astro/ordersStore.DGUKYUHB.js","/_astro/QuoteShipping.BMX2HhfS.js","/_astro/RegisterGoogle.D10TzbJZ.js","/_astro/SelectForm.C0H2QA_W.js","/_astro/Shipment.BolMIqj2.js","/_astro/ShipmentProgress.BdjhbEf_.js","/_astro/SideMenu.LyKGE26O.js","/_astro/UlNavBar.CZVmDIkh.js","/_astro/UserInfoDashboard.BPZ9QJ4o.js","/_astro/UserSecurity.CN0AMjy6.js","/_astro/UserShipments.BUvNbygr.js","/_astro/userStore.C_79YqMW.js","/_astro/_astro-entry_react-toastify.CJU19mtT.js","/_astro/_astro-entry_react-toastify.CX4FvO7v.js","/404.html","/about/index.html","/auth/login/index.html","/auth/register/index.html","/auth/registergoogle/index.html","/dashboard/admin/index.html","/dashboard/security/index.html","/dashboard/shipments/index.html","/dashboard/trackeo/index.html","/dashboard/index.html","/faqs/index.html","/new-shipment/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
