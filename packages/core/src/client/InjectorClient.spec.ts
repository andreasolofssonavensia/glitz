import { createHashCounter } from '../utils/hash';
import InjectorClient from './InjectorClient';

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('client', () => {
  it('injects plain rule', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' })).toBe('a');
    expect(injector.injectClassName({ color: 'green', backgroundColor: 'black' })).toBe('b');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(2);
    expect(sheet.cssRules[0].cssText).toMatchSnapshot();
    expect(sheet.cssRules[1].cssText).toMatchSnapshot();
  });
  it('injects pseudo selector', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' }, ':hover')).toBe('a');
    expect(injector.injectClassName({ color: 'green', backgroundColor: 'black' }, ':hover')).toBe('b');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(2);
    expect(sheet.cssRules[0].cssText).toMatchSnapshot();
    expect(sheet.cssRules[1].cssText).toMatchSnapshot();
  });
  it('injects attribute selector', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' }, '[disabled]')).toBe('a');
    expect(injector.injectClassName({ color: 'green', backgroundColor: 'black' }, '[disabled]')).toBe('b');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(2);
    expect(sheet.cssRules[0].cssText).toMatchSnapshot();
    expect(sheet.cssRules[1].cssText).toMatchSnapshot();
  });
  it('injects keyframes rule', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectKeyframes({ from: { color: 'red' }, to: { color: 'green' } })).toBe('a');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
    expect(sheet.cssRules[0].cssText).toMatchSnapshot();
  });
  it('injects font face rule', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(
      injector.injectFontFace({
        fontFamily: 'x',
        fontStyle: 'normal',
        fontWeight: 400,
        src: "url(https://fonts.gstatic.com/s/paytoneone/v10/0nksC9P7MfYHj2oFtYm2ChTtgPs.woff2) format('woff2')",
      }),
    ).toBe('x');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
    expect(sheet.cssRules[0].cssText).toMatchSnapshot();
  });
  it('injects fallback rule', () => {
    // Use Puppeteer
  });
  it('reuses plain rule', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' })).toBe('a');
    expect(injector.injectClassName({ color: 'red' })).toBe('a');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
  });
  it('reuses pseudo selector', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' }, ':hover')).toBe('a');
    expect(injector.injectClassName({ color: 'red' }, ':hover')).toBe('a');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
  });
  it('reuses attribute selector', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' }, '[disabled]')).toBe('a');
    expect(injector.injectClassName({ color: 'red' }, '[disabled]')).toBe('a');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
  });
  it('reuses keyframes rule', () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectKeyframes({ from: { color: 'red' }, to: { color: 'green' } })).toBe('a');
    expect(injector.injectKeyframes({ from: { color: 'red' }, to: { color: 'green' } })).toBe('a');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules).toHaveLength(1);
  });
  it('reuses fallback rule', () => {
    // Use Puppeteer
  });
  it('hydrates plain rule', () => {
    const style = createStyle('.a{color:red}.b{color:green}.c{color:black;background-color:white}');
    const injector = createInjector(style);

    // Skipping .a
    expect(injector.injectClassName({ color: 'green' })).toBe('b');
    expect(injector.injectClassName({ color: 'black', backgroundColor: 'white' })).toBe('c');
  });
  it('hydrates pseudo selector', () => {
    const style = createStyle('.a:hover{color:red}.b:hover{color:green}');
    const injector = createInjector(style);

    // Skipping .a
    expect(injector.injectClassName({ color: 'green' }, ':hover')).toBe('b');
  });
  it('hydrates attribute selector', () => {
    const style = createStyle('.a[disabled]{color:red}.b[disabled]{color:green}');
    const injector = createInjector(style);

    // Skipping .a
    expect(injector.injectClassName({ color: 'green' }, '[disabled]')).toBe('b');
  });
  it('hydrates keyframes rule', () => {
    const style = createStyle(
      '@keyframes a{from{color:red}to{color:green}}@keyframes b{from{color:black}to{color:white}}',
    );
    const injector = createInjector(style);

    // Skipping .a
    expect(injector.injectKeyframes({ from: { color: 'black' }, to: { color: 'white' } })).toBe('b');
  });
  it('hydrates font face rule', () => {
    const style = createStyle(
      "@font-face {font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/paytoneone/v10/0nksC9P7MfYHj2oFtYm2ChTtgPs.woff2) format('woff2');font-family:x}" +
        "@font-face {font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/paytoneone/v10/0nksC9P7MfYHj2oFtYm2ChTjgPvNiA.woff2) format('woff2');font-family:y}",
    );
    const injector = createInjector(style);

    // Skipping .a
    expect(
      injector.injectFontFace({
        fontFamily: 'y',
        fontStyle: 'normal',
        fontWeight: 400,
        src: "url(https://fonts.gstatic.com/s/paytoneone/v10/0nksC9P7MfYHj2oFtYm2ChTjgPvNiA.woff2) format('woff2')",
      }),
    ).toBe('y');
  });
  it('hydrates fallback rule', () => {
    const style = createStyle('.a{color:red;color:green}.b{color:black;color:white}');
    const injector = createInjector(style);

    // Skipping .a
    expect(injector.injectClassName({ color: ['black', 'white'] })).toBe('b');
  });
  it('increments plain hash', () => {
    const style = createStyle('.a{color:red}.b{color:green}');
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'blue' })).toBe('c');

    const sheet = style.sheet as CSSStyleSheet;

    expect(sheet.cssRules[2].cssText).toMatchSnapshot();
  });
  it("won't fail if style element is removed from DOM", () => {
    const style = createStyle();
    const injector = createInjector(style);

    expect(injector.injectClassName({ color: 'red' })).toBe('a');

    document.head.removeChild(style);

    expect(injector.injectClassName({ color: 'green' })).toBe('b');
  });
  it("will fail if style element wasn't inserted to DOM", () => {
    const style = createStyle();
    document.head.removeChild(style);

    expect(() => createInjector(style)).toThrowError();
  });
});

function createStyle(css?: string) {
  const element = document.createElement('style');
  document.head.appendChild(element);

  if (css) {
    element.appendChild(document.createTextNode(css));
  }

  return element;
}

function createInjector(style: HTMLStyleElement) {
  return new InjectorClient(style, createHashCounter(), createHashCounter());
}
