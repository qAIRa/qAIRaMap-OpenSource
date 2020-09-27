import { changeView , goTo} from '../src/lib/viewController.js';
import { initialize} from "@googlemaps/jest-mocks";
import { downloadView } from '../src/views/downloadView.js';
import { viewDashboard } from '../src/views/dashboardView.js';
import { viewGraphics } from '../src/views/graphicsView.js';
const mockFn = jest.fn().mockImplementation(google=> google.maps.MapTypeId.ROADMAP);
MapTypeId: google => jest.fn().mockImplementation(google=> google.maps.MapTypeId.ROADMAP)


  jest.fn().mockImplementation((mapTypeId= google.maps.MapTypeId | 'ROADMAP') => {})
beforeEach(() => {
  
    initialize();

  });
  afterEach(()=>{
    jest.clearAllMocks()
  })

test('Add view', () => {

    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
   

    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js');
    const container = document.getElementById('content-page')
    
    // expect(changeView('#/')).toStrictEqual(container.appendChild(viewFreeMap()))
    expect(changeView('#/download')).toStrictEqual(container.appendChild(downloadView()))
    expect(changeView('#/dashboard')).toStrictEqual(container.appendChild(viewDashboard()))
    expect(changeView('#/graphics')).toStrictEqual(container.appendChild(viewGraphics()))
    // expect(changeView('')).toStrictEqual(container.appendChild(viewFreeMap()))

  });

  test('directioner', () =>{
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn(),reload: jest.fn() }
    });
    expect(goTo('/')).toBe();
});
