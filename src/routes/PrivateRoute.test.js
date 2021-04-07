import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "./PrivateRoute";

describe('test in private route', () => {

    const rest = {
        location: {
            pathname: '/test',
            search: 'search'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test('should show route if user is auth', () => {
        const warpper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => (<p>hola</p>)}
                    {...rest} />
            </MemoryRouter>
        );
        expect(warpper.find('p').exists()).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', `${rest.location.pathname}${rest.location.search || ''}`);
    });

    test('should not show route if user is auth', () => {
        const warpper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => (<p>hola</p>)}
                    {...rest} />
            </MemoryRouter>
        );
        expect(warpper.find('p').exists()).toBeFalsy();
    });

});