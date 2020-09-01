import { changeView , goTo} from '../src/lib/viewController.js';
import { initialize} from "@googlemaps/jest-mocks";
import { downloadView } from '../src/views/downloadView.js';
import { viewDashboard } from '../src/views/dashboardView.js';
import { viewGraphics } from '../src/views/graphicsView.js';
// const mockFn = jest.fn().mockImplementation(google=> google.maps.MapTypeId.ROADMAP);
// MapTypeId: google => jest.fn().mockImplementation(google=> google.maps.MapTypeId.ROADMAP)


//   jest.fn().mockImplementation((mapTypeId= google.maps.MapTypeId | 'ROADMAP') => {})
beforeEach(() => {
    
    initialize();

  });

test('Add view', () => {

    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();

      afterEach(() => {

        google.maps.Map.mockReset();
        google.maps.MapTypeId.mockReset();
        google.maps.MapTypeId.ROADMAP.mockReset();
      });
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js');
    require('../build/css/materialize.min.css');
    const container = document.getElementById('content-page')
    
    // expect(changeView('#/')).toStrictEqual(container.appendChild(viewFreeMap()))
    expect(changeView('#/download')).toStrictEqual(container.appendChild(downloadView()))
    expect(changeView('#/dashboard')).toStrictEqual(container.appendChild(viewDashboard()))
    expect(changeView('#/graphics')).toStrictEqual(container.appendChild(viewGraphics()))
    // expect(changeView('')).toStrictEqual(container.appendChild(viewFreeMap()))
  });
