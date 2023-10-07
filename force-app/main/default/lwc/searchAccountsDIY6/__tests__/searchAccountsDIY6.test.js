import { createElement } from 'lwc';
import SearchAccountsDIY6 from 'c/searchAccountsDIY6';

describe('c-search-accounts-d-i-y-6', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-search-accounts-d-i-y-6', {
            is: SearchAccountsDIY6
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});