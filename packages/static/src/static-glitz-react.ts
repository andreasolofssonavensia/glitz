import {
  cleanStyle,
  isStaticComponent,
  isStaticDecorator,
  DirtyStyle,
  ReactFunctionComponent,
  StaticComponent,
  StaticDecorator,
  StaticElement,
  StaticElementName,
  StaticStyled,
  Style,
  Styles,
  isStaticElement,
} from './shared';

function createStaticDecorator(styles: Style[]): StaticDecorator {
  return Object.assign(
    (arg1?: Styles | StaticComponent | ReactFunctionComponent | StaticElement, arg2?: Styles): any => {
      return isStaticComponent(arg1) || isStaticElement(arg1)
        ? createStaticComponent(arg1.elementName, [...arg1.styles, ...styles, ...cleanStyle([arg2])])
        : typeof arg1 === 'object' || isStaticDecorator(arg1)
        ? createStaticStyled([...styles, ...cleanStyle([arg1])])
        : typeof arg1 === 'undefined'
        ? styles
        : arg1;
    },
    { decorator: true } as const,
  );
}

function createStaticStyled(styles: Style[]): StaticStyled {
  return Object.assign(
    (arg1?: Styles | StaticComponent | ReactFunctionComponent | StaticElement, ...rest: Styles[]): any => {
      return isStaticComponent(arg1) || isStaticElement(arg1)
        ? createStaticComponent(arg1.elementName, [...arg1.styles, ...styles, ...cleanStyle(rest)])
        : typeof arg1 === 'object' || isStaticDecorator(arg1)
        ? createStaticDecorator([...styles, ...cleanStyle([arg1]), ...cleanStyle(rest)])
        : typeof arg1 === 'undefined'
        ? styles
        : arg1;
    },
    { decorator: true } as const,
  );
}

function createStaticComponent(elementName: StaticElementName, styles?: Style[]): StaticComponent {
  function Component(props: any = {}) {
    return {
      styles: cleanStyle(props.css),
      elementName,
    };
  }

  return Object.assign(Component, { styles: styles ?? [], elementName });
}

export function applyClassName(_component: any): StaticElement;
export function applyClassName(_component: any, tsStaticArgumentNodes?: any[]): StaticElement {
  return {
    styles: [],
    elementName: tsStaticArgumentNodes![0],
  };
}

export function useStyle(style: DirtyStyle): Style[] {
  return cleanStyle([style]);
}

function createStaticComponentFactory(tagName: string) {
  return (...styles: Styles[]) => createStaticComponent(tagName, cleanStyle(styles));
}

export const styled = Object.assign(
  createStaticStyled([]),
  {
    a: createStaticComponentFactory('a'),
    abbr: createStaticComponentFactory('abbr'),
    address: createStaticComponentFactory('address'),
    area: createStaticComponentFactory('area'),
    article: createStaticComponentFactory('article'),
    aside: createStaticComponentFactory('aside'),
    audio: createStaticComponentFactory('audio'),
    b: createStaticComponentFactory('b'),
    base: createStaticComponentFactory('base'),
    bdi: createStaticComponentFactory('bdi'),
    bdo: createStaticComponentFactory('bdo'),
    big: createStaticComponentFactory('big'),
    blockquote: createStaticComponentFactory('blockquote'),
    body: createStaticComponentFactory('body'),
    br: createStaticComponentFactory('br'),
    button: createStaticComponentFactory('button'),
    canvas: createStaticComponentFactory('canvas'),
    caption: createStaticComponentFactory('caption'),
    cite: createStaticComponentFactory('cite'),
    code: createStaticComponentFactory('code'),
    col: createStaticComponentFactory('col'),
    colgroup: createStaticComponentFactory('colgroup'),
    data: createStaticComponentFactory('data'),
    datalist: createStaticComponentFactory('datalist'),
    dd: createStaticComponentFactory('dd'),
    del: createStaticComponentFactory('del'),
    details: createStaticComponentFactory('details'),
    dfn: createStaticComponentFactory('dfn'),
    dialog: createStaticComponentFactory('dialog'),
    div: createStaticComponentFactory('div'),
    dl: createStaticComponentFactory('dl'),
    dt: createStaticComponentFactory('dt'),
    em: createStaticComponentFactory('em'),
    embed: createStaticComponentFactory('embed'),
    fieldset: createStaticComponentFactory('fieldset'),
    figcaption: createStaticComponentFactory('figcaption'),
    figure: createStaticComponentFactory('figure'),
    footer: createStaticComponentFactory('footer'),
    form: createStaticComponentFactory('form'),
    h1: createStaticComponentFactory('h1'),
    h2: createStaticComponentFactory('h2'),
    h3: createStaticComponentFactory('h3'),
    h4: createStaticComponentFactory('h4'),
    h5: createStaticComponentFactory('h5'),
    h6: createStaticComponentFactory('h6'),
    head: createStaticComponentFactory('head'),
    header: createStaticComponentFactory('header'),
    hgroup: createStaticComponentFactory('hgroup'),
    hr: createStaticComponentFactory('hr'),
    html: createStaticComponentFactory('html'),
    i: createStaticComponentFactory('i'),
    iframe: createStaticComponentFactory('iframe'),
    img: createStaticComponentFactory('img'),
    input: createStaticComponentFactory('input'),
    ins: createStaticComponentFactory('ins'),
    kbd: createStaticComponentFactory('kbd'),
    keygen: createStaticComponentFactory('keygen'),
    label: createStaticComponentFactory('label'),
    legend: createStaticComponentFactory('legend'),
    li: createStaticComponentFactory('li'),
    link: createStaticComponentFactory('link'),
    main: createStaticComponentFactory('main'),
    map: createStaticComponentFactory('map'),
    mark: createStaticComponentFactory('mark'),
    menu: createStaticComponentFactory('menu'),
    menuitem: createStaticComponentFactory('menuitem'),
    meta: createStaticComponentFactory('meta'),
    meter: createStaticComponentFactory('meter'),
    nav: createStaticComponentFactory('nav'),
    noindex: createStaticComponentFactory('noindex'),
    noscript: createStaticComponentFactory('noscript'),
    object: createStaticComponentFactory('object'),
    ol: createStaticComponentFactory('ol'),
    optgroup: createStaticComponentFactory('optgroup'),
    option: createStaticComponentFactory('option'),
    output: createStaticComponentFactory('output'),
    p: createStaticComponentFactory('p'),
    param: createStaticComponentFactory('param'),
    picture: createStaticComponentFactory('picture'),
    pre: createStaticComponentFactory('pre'),
    progress: createStaticComponentFactory('progress'),
    q: createStaticComponentFactory('q'),
    rp: createStaticComponentFactory('rp'),
    rt: createStaticComponentFactory('rt'),
    ruby: createStaticComponentFactory('ruby'),
    s: createStaticComponentFactory('s'),
    samp: createStaticComponentFactory('samp'),
    slot: createStaticComponentFactory('slot'),
    script: createStaticComponentFactory('script'),
    section: createStaticComponentFactory('section'),
    select: createStaticComponentFactory('select'),
    small: createStaticComponentFactory('small'),
    source: createStaticComponentFactory('source'),
    span: createStaticComponentFactory('span'),
    strong: createStaticComponentFactory('strong'),
    style: createStaticComponentFactory('style'),
    sub: createStaticComponentFactory('sub'),
    summary: createStaticComponentFactory('summary'),
    sup: createStaticComponentFactory('sup'),
    table: createStaticComponentFactory('table'),
    template: createStaticComponentFactory('template'),
    tbody: createStaticComponentFactory('tbody'),
    td: createStaticComponentFactory('td'),
    textarea: createStaticComponentFactory('textarea'),
    tfoot: createStaticComponentFactory('tfoot'),
    th: createStaticComponentFactory('th'),
    thead: createStaticComponentFactory('thead'),
    time: createStaticComponentFactory('time'),
    title: createStaticComponentFactory('title'),
    tr: createStaticComponentFactory('tr'),
    track: createStaticComponentFactory('track'),
    u: createStaticComponentFactory('u'),
    ul: createStaticComponentFactory('ul'),
    var: createStaticComponentFactory('var'),
    video: createStaticComponentFactory('video'),
    wbr: createStaticComponentFactory('wbr'),
    webview: createStaticComponentFactory('webview'),
    svg: createStaticComponentFactory('svg'),
    animate: createStaticComponentFactory('animate'),
    animateMotion: createStaticComponentFactory('animateMotion'),
    animateTransform: createStaticComponentFactory('animateTransform'),
    circle: createStaticComponentFactory('circle'),
    clipPath: createStaticComponentFactory('clipPath'),
    defs: createStaticComponentFactory('defs'),
    desc: createStaticComponentFactory('desc'),
    ellipse: createStaticComponentFactory('ellipse'),
    feBlend: createStaticComponentFactory('feBlend'),
    feColorMatrix: createStaticComponentFactory('feColorMatrix'),
    feComponentTransfer: createStaticComponentFactory('feComponentTransfer'),
    feComposite: createStaticComponentFactory('feComposite'),
    feConvolveMatrix: createStaticComponentFactory('feConvolveMatrix'),
    feDiffuseLighting: createStaticComponentFactory('feDiffuseLighting'),
    feDisplacementMap: createStaticComponentFactory('feDisplacementMap'),
    feDistantLight: createStaticComponentFactory('feDistantLight'),
    feDropShadow: createStaticComponentFactory('feDropShadow'),
    feFlood: createStaticComponentFactory('feFlood'),
    feFuncA: createStaticComponentFactory('feFuncA'),
    feFuncB: createStaticComponentFactory('feFuncB'),
    feFuncG: createStaticComponentFactory('feFuncG'),
    feFuncR: createStaticComponentFactory('feFuncR'),
    feGaussianBlur: createStaticComponentFactory('feGaussianBlur'),
    feImage: createStaticComponentFactory('feImage'),
    feMerge: createStaticComponentFactory('feMerge'),
    feMergeNode: createStaticComponentFactory('feMergeNode'),
    feMorphology: createStaticComponentFactory('feMorphology'),
    feOffset: createStaticComponentFactory('feOffset'),
    fePointLight: createStaticComponentFactory('fePointLight'),
    feSpecularLighting: createStaticComponentFactory('feSpecularLighting'),
    feSpotLight: createStaticComponentFactory('feSpotLight'),
    feTile: createStaticComponentFactory('feTile'),
    feTurbulence: createStaticComponentFactory('feTurbulence'),
    filter: createStaticComponentFactory('filter'),
    foreignObject: createStaticComponentFactory('foreignObject'),
    g: createStaticComponentFactory('g'),
    image: createStaticComponentFactory('image'),
    line: createStaticComponentFactory('line'),
    linearGradient: createStaticComponentFactory('linearGradient'),
    marker: createStaticComponentFactory('marker'),
    mask: createStaticComponentFactory('mask'),
    metadata: createStaticComponentFactory('metadata'),
    mpath: createStaticComponentFactory('mpath'),
    path: createStaticComponentFactory('path'),
    pattern: createStaticComponentFactory('pattern'),
    polygon: createStaticComponentFactory('polygon'),
    polyline: createStaticComponentFactory('polyline'),
    radialGradient: createStaticComponentFactory('radialGradient'),
    rect: createStaticComponentFactory('rect'),
    stop: createStaticComponentFactory('stop'),
    switch: createStaticComponentFactory('switch'),
    symbol: createStaticComponentFactory('symbol'),
    text: createStaticComponentFactory('text'),
    textPath: createStaticComponentFactory('textPath'),
    tspan: createStaticComponentFactory('tspan'),
    use: createStaticComponentFactory('use'),
    view: createStaticComponentFactory('view'),
  },
  {
    A: createStaticComponent('a'),
    Abbr: createStaticComponent('abbr'),
    Address: createStaticComponent('address'),
    Area: createStaticComponent('area'),
    Article: createStaticComponent('article'),
    Aside: createStaticComponent('aside'),
    Audio: createStaticComponent('audio'),
    B: createStaticComponent('b'),
    Base: createStaticComponent('base'),
    Bdi: createStaticComponent('bdi'),
    Bdo: createStaticComponent('bdo'),
    Big: createStaticComponent('big'),
    Blockquote: createStaticComponent('blockquote'),
    Body: createStaticComponent('body'),
    Br: createStaticComponent('br'),
    Button: createStaticComponent('button'),
    Canvas: createStaticComponent('canvas'),
    Caption: createStaticComponent('caption'),
    Cite: createStaticComponent('cite'),
    Code: createStaticComponent('code'),
    Col: createStaticComponent('col'),
    Colgroup: createStaticComponent('colgroup'),
    Data: createStaticComponent('data'),
    Datalist: createStaticComponent('datalist'),
    Dd: createStaticComponent('dd'),
    Del: createStaticComponent('del'),
    Details: createStaticComponent('details'),
    Dfn: createStaticComponent('dfn'),
    Dialog: createStaticComponent('dialog'),
    Div: createStaticComponent('div'),
    Dl: createStaticComponent('dl'),
    Dt: createStaticComponent('dt'),
    Em: createStaticComponent('em'),
    Embed: createStaticComponent('embed'),
    Fieldset: createStaticComponent('fieldset'),
    Figcaption: createStaticComponent('figcaption'),
    Figure: createStaticComponent('figure'),
    Footer: createStaticComponent('footer'),
    Form: createStaticComponent('form'),
    H1: createStaticComponent('h1'),
    H2: createStaticComponent('h2'),
    H3: createStaticComponent('h3'),
    H4: createStaticComponent('h4'),
    H5: createStaticComponent('h5'),
    H6: createStaticComponent('h6'),
    Head: createStaticComponent('head'),
    Header: createStaticComponent('header'),
    Hgroup: createStaticComponent('hgroup'),
    Hr: createStaticComponent('hr'),
    Html: createStaticComponent('html'),
    I: createStaticComponent('i'),
    Iframe: createStaticComponent('iframe'),
    Img: createStaticComponent('img'),
    Input: createStaticComponent('input'),
    Ins: createStaticComponent('ins'),
    Kbd: createStaticComponent('kbd'),
    Keygen: createStaticComponent('keygen'),
    Label: createStaticComponent('label'),
    Legend: createStaticComponent('legend'),
    Li: createStaticComponent('li'),
    Link: createStaticComponent('link'),
    Main: createStaticComponent('main'),
    Map: createStaticComponent('map'),
    Mark: createStaticComponent('mark'),
    Menu: createStaticComponent('menu'),
    Menuitem: createStaticComponent('menuitem'),
    Meta: createStaticComponent('meta'),
    Meter: createStaticComponent('meter'),
    Nav: createStaticComponent('nav'),
    Noindex: createStaticComponent('noindex'),
    Noscript: createStaticComponent('noscript'),
    Object: createStaticComponent('object'),
    Ol: createStaticComponent('ol'),
    Optgroup: createStaticComponent('optgroup'),
    Option: createStaticComponent('option'),
    Output: createStaticComponent('output'),
    P: createStaticComponent('p'),
    Param: createStaticComponent('param'),
    Picture: createStaticComponent('picture'),
    Pre: createStaticComponent('pre'),
    Progress: createStaticComponent('progress'),
    Q: createStaticComponent('q'),
    Rp: createStaticComponent('rp'),
    Rt: createStaticComponent('rt'),
    Ruby: createStaticComponent('ruby'),
    S: createStaticComponent('s'),
    Samp: createStaticComponent('samp'),
    Slot: createStaticComponent('slot'),
    Script: createStaticComponent('script'),
    Section: createStaticComponent('section'),
    Select: createStaticComponent('select'),
    Small: createStaticComponent('small'),
    Source: createStaticComponent('source'),
    Span: createStaticComponent('span'),
    Strong: createStaticComponent('strong'),
    Style: createStaticComponent('style'),
    Sub: createStaticComponent('sub'),
    Summary: createStaticComponent('summary'),
    Sup: createStaticComponent('sup'),
    Table: createStaticComponent('table'),
    Template: createStaticComponent('template'),
    Tbody: createStaticComponent('tbody'),
    Td: createStaticComponent('td'),
    Textarea: createStaticComponent('textarea'),
    Tfoot: createStaticComponent('tfoot'),
    Th: createStaticComponent('th'),
    Thead: createStaticComponent('thead'),
    Time: createStaticComponent('time'),
    Title: createStaticComponent('title'),
    Tr: createStaticComponent('tr'),
    Track: createStaticComponent('track'),
    U: createStaticComponent('u'),
    Ul: createStaticComponent('ul'),
    Var: createStaticComponent('var'),
    Video: createStaticComponent('video'),
    Wbr: createStaticComponent('wbr'),
    Webview: createStaticComponent('webview'),
    Svg: createStaticComponent('svg'),
    Animate: createStaticComponent('animate'),
    AnimateMotion: createStaticComponent('animateMotion'),
    AnimateTransform: createStaticComponent('animateTransform'),
    Circle: createStaticComponent('circle'),
    ClipPath: createStaticComponent('clipPath'),
    Defs: createStaticComponent('defs'),
    Desc: createStaticComponent('desc'),
    Ellipse: createStaticComponent('ellipse'),
    FeBlend: createStaticComponent('feBlend'),
    FeColorMatrix: createStaticComponent('feColorMatrix'),
    FeComponentTransfer: createStaticComponent('feComponentTransfer'),
    FeComposite: createStaticComponent('feComposite'),
    FeConvolveMatrix: createStaticComponent('feConvolveMatrix'),
    FeDiffuseLighting: createStaticComponent('feDiffuseLighting'),
    FeDisplacementMap: createStaticComponent('feDisplacementMap'),
    FeDistantLight: createStaticComponent('feDistantLight'),
    FeDropShadow: createStaticComponent('feDropShadow'),
    FeFlood: createStaticComponent('feFlood'),
    FeFuncA: createStaticComponent('feFuncA'),
    FeFuncB: createStaticComponent('feFuncB'),
    FeFuncG: createStaticComponent('feFuncG'),
    FeFuncR: createStaticComponent('feFuncR'),
    FeGaussianBlur: createStaticComponent('feGaussianBlur'),
    FeImage: createStaticComponent('feImage'),
    FeMerge: createStaticComponent('feMerge'),
    FeMergeNode: createStaticComponent('feMergeNode'),
    FeMorphology: createStaticComponent('feMorphology'),
    FeOffset: createStaticComponent('feOffset'),
    FePointLight: createStaticComponent('fePointLight'),
    FeSpecularLighting: createStaticComponent('feSpecularLighting'),
    FeSpotLight: createStaticComponent('feSpotLight'),
    FeTile: createStaticComponent('feTile'),
    FeTurbulence: createStaticComponent('feTurbulence'),
    Filter: createStaticComponent('filter'),
    ForeignObject: createStaticComponent('foreignObject'),
    G: createStaticComponent('g'),
    Image: createStaticComponent('image'),
    Line: createStaticComponent('line'),
    LinearGradient: createStaticComponent('linearGradient'),
    Marker: createStaticComponent('marker'),
    Mask: createStaticComponent('mask'),
    Metadata: createStaticComponent('metadata'),
    Mpath: createStaticComponent('mpath'),
    Path: createStaticComponent('path'),
    Pattern: createStaticComponent('pattern'),
    Polygon: createStaticComponent('polygon'),
    Polyline: createStaticComponent('polyline'),
    RadialGradient: createStaticComponent('radialGradient'),
    Rect: createStaticComponent('rect'),
    Stop: createStaticComponent('stop'),
    Switch: createStaticComponent('switch'),
    Symbol: createStaticComponent('symbol'),
    Text: createStaticComponent('text'),
    TextPath: createStaticComponent('textPath'),
    Tspan: createStaticComponent('tspan'),
    Use: createStaticComponent('use'),
    View: createStaticComponent('view'),
  },
);
