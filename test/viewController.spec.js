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
    window.M = jest.fn();
    M.toast = jest.fn();
    M.Dropdown= jest.fn();
    M.Dropdown.init= jest.fn();
    M.Sidenav= jest.fn();
    M.Sidenav.init= jest.fn();
    M.Modal=jest.fn();
    M.Modal.init=jest.fn();
    M.FormSelect=jest.fn();
    M.FormSelect.init=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();

      afterEach(() => {
        window.M.mockReset();
        M.toast.mockReset();
        M.Dropdown.mockReset();
        M.Dropdown.init.mockReset();
        M.Sidenav.mockReset();
        M.Sidenav.init.mockReset();
        M.Modal.mockReset();
        M.Modal.init.mockReset(); 
        M.FormSelect.mockReset();
        M.FormSelect.init.mockReset();
        google.maps.MapTypeId.mockReset();
        google.maps.MapTypeId.ROADMAP.mockReset();
      });
    document.body.innerHTML = `
    <header></header>
      <div id="content-page">Add todo</div>
    `;
    require('../src/lib/viewController.js');
    const container = document.getElementById('content-page')

    // expect(changeView('')).toStrictEqual(container.appendChild(viewFreeMap()))
    // expect(changeView('#/')).toStrictEqual(container.appendChild(viewFreeMap()))
    expect(changeView('#/download')).toStrictEqual(container.appendChild(downloadView()))
    expect(changeView('#/dashboard')).toStrictEqual(container.appendChild(viewDashboard()))
    expect(changeView('#/graphics')).toStrictEqual(container.appendChild(viewGraphics()))
  });
