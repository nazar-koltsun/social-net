import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('Profile status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra.com');
    });

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus />);
        let root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com' />);
        let instance = component.root;
        let span = instance.findByType('span');
        expect(span.children[0]).toBe('it-kamasutra.com');
    });

    test("after creation <input> should't be displayed", () => {
        const component = create(<ProfileStatus />);
        let instance = component.root;
        expect(() => {
            let input = instance.findByType('input');
        }).toThrow();
    });

    test("input should be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>);
        let instance = component.root;
        let span = instance.findByType('span');
        span.props.onDoubleClick()
        let input = instance.findByType('input');
        expect(input.props.value).toBe('it-kamasutra.com');
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='it-kamasutra.com' updateUserStatus={mockCallback} />);
        let instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
