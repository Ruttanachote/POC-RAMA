export default function BrowserType(lang: 'en') {
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    ua
      .match(regexp)
      ?.toString()
      .replace(/[^0-9|_.]/g, '')
      .replace(/_/g, '.');
  const system =
    new Map([
      [testUa(/windows|win32|win64|wow32|wow64/g), 'windows'],
      [testUa(/macintosh|macintel/g), 'macos'],
      [testUa(/x11/g), 'linux'],
      [testUa(/android|adr/g), 'android'],
      [testUa(/ios|iphone|ipad|ipod|iwatch/g), 'ios'],
    ]).get(true) || 'unknow';

  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [testUa(/windows nt 5.0|windows 2000/g), '2000'],
          [testUa(/windows nt 5.1|windows xp/g), 'xp'],
          [testUa(/windows nt 5.2|windows 2003/g), '2003'],
          [testUa(/windows nt 6.0|windows vista/g), 'vista'],
          [testUa(/windows nt 6.1|windows 7/g), '7'],
          [testUa(/windows nt 6.2|windows 8/g), '8'],
          [testUa(/windows nt 6.3|windows 8.1/g), '8.1'],
          [testUa(/windows nt 10.0|windows 10/g), '10'],
        ]).get(true),
      ],
      ['macos', testVs(/os x [\d._]+/g)],
      ['android', testVs(/android [\d._]+/g)],
      ['ios', testVs(/os [\d._]+/g)],
    ]).get(system) || 'unknow';

  let platform = 'unknow';
  if (system === 'windows' || system === 'macos' || system === 'linux') {
    platform = 'desktop';
  } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
    platform = 'mobile'; 
  }

  const [engine = 'unknow', supporter = 'unknow'] = new Map([
    [
      testUa(/applewebkit/g),
      [
        'webkit',
        new Map([
          [testUa(/safari/g), 'safari'],
          [testUa(/chrome/g), 'chrome'], 
          [testUa(/opr/g), 'opera'],
          [testUa(/edge/g), 'edge'], 
        ]).get(true),
      ] || 'unknow',
    ], 
    [testUa(/gecko/g) && testUa(/firefox/g), ['gecko', 'firefox']], 
    [testUa(/presto/g), ['presto', 'opera']], 
    [testUa(/trident|compatible|msie/g), ['trident', 'iexplore']], 
  ]).get(true) || ['unknow', 'unknow'];

  const engineVs =
    new Map([
      ['webkit', testVs(/applewebkit\/[\d._]+/g)],
      ['gecko', testVs(/gecko\/[\d._]+/g)],
      ['presto', testVs(/presto\/[\d._]+/g)],
      ['trident', testVs(/trident\/[\d._]+/g)],
    ]).get(engine) || 'unknow';

  const supporterVs =
    new Map([
      ['firefox', testVs(/firefox\/[\d._]+/g)],
      ['opera', testVs(/opr\/[\d._]+/g)],
      ['iexplore', testVs(/(msie [\d._]+)|(rv:[\d._]+)/g)],
      ['edge', testVs(/edge\/[\d._]+/g)],
      ['safari', testVs(/version\/[\d._]+/g)],
      ['chrome', testVs(/chrome\/[\d._]+/g)],
    ]).get(supporter) || 'unknow';

  const [shell = 'none', shellVs = 'unknow'] = new Map([
    [testUa(/micromessenger/g), ['wechat', testVs(/micromessenger\/[\d._]+/g)]], 
    [testUa(/qqbrowser/g), ['qq', testVs(/qqbrowser\/[\d._]+/g)]], 
    [testUa(/ucbrowser/g), ['uc', testVs(/ucbrowser\/[\d._]+/g)]], 
    [testUa(/qihu 360se/g), ['360', 'unknow']],
    [testUa(/2345explorer/g), ['2345', testVs(/2345explorer\/[\d._]+/g)]],
    [testUa(/metasr/g), ['sougou', 'unknow']],
    [testUa(/lbbrowser/g), ['liebao', 'unknow']], 
    [testUa(/maxthon/g), ['maxthon', testVs(/maxthon\/[\d._]+/g)]], 
  ]).get(true) || ['none', 'unknow'];

  return {
    en: Object.assign(
      {
        engine, 
        engineVs, 
        platform, 
        supporter,
        supporterVs, 
        system,
        systemVs, 
      },
      shell === 'none'
        ? {}
        : {
            shell,
            shellVs,
          }
    ),
  }[lang];
}
