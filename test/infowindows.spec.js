import {generateGif} from '../src/lib/infowindows.js';

test('gif', () => {
    expect(generateGif(0)).toEqual('/img/qairito/qairito_buena.gif');
    expect(generateGif(51)).toEqual('/img/qairito/qairito_moderada.gif');
    expect(generateGif(101)).toEqual('/img/qairito/qairito_mala.gif');
    expect(generateGif(501)).toEqual('/img/qairito/qairito_cuidado.gif');
    });
    