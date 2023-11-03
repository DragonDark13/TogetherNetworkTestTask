import {dropdownValues} from "./_data.js"
import {initSliderForDropDown} from "./_initSlider.js";

document.addEventListener('DOMContentLoaded', () => {


    initSliderForDropDown(dropdownValues);

    let isDropdownOpen = false;

    const toggleDropdown = (dropdownContainer, open) => {
        dropdownContainer.classList.remove(open ? 'closed' : 'open');
        dropdownContainer.classList.add(open ? 'open' : 'closed');
        isDropdownOpen = open;
    };

    const handleDropdownAreaClick = (event) => {
        const dropdownArea = event.target.closest('.dropdown_area');
        if (dropdownArea) {
            const dropdownContainer = dropdownArea.parentNode;
            const dropdownInput = dropdownContainer.querySelector('.dropdown_input');
            const selectedValue = dropdownArea.dataset.dropdownValue;

            if (selectedValue === "") {
                const firstListItem = dropdownContainer.querySelector('.dropdown_list_item');
                if (firstListItem) {
                    const firstValue = firstListItem.dataset.dropdownItem;
                    dropdownInput.textContent = firstValue;
                    dropdownArea.dataset.dropdownValue = firstValue;
                    firstListItem.classList.add('selectedItem');
                }
            }

            toggleDropdown(dropdownContainer, !isDropdownOpen);

            if (!dropdownContainer.classList.contains('active')) {
                dropdownContainer.classList.add('active');
            }
        }
    };

    const handleDropdownListItemClick = (item) => {
        const selectedValue = item.getAttribute('data-dropdown-item');
        const dropdownContainer = item.closest('.dropdown_container');
        const dropdownInput = dropdownContainer.querySelector('.dropdown_input');
        const dropdownArea = dropdownContainer.querySelector('.dropdown_area');

        dropdownContainer.querySelectorAll('.dropdown_list_item').forEach((listItem) => {
            listItem.classList.remove('selectedItem');
        });

        item.classList.add('selectedItem');
        dropdownInput.textContent = selectedValue;
        dropdownArea.dataset.dropdownValue = selectedValue;

        toggleDropdown(dropdownContainer, false);
    };

    const handleCloseOpenDropdowns = (event) => {
        const openDropdownContainers = document.querySelectorAll('.dropdown_container.open');

        openDropdownContainers.forEach((dropdownContainer) => {
            if (!dropdownContainer.contains(event.target)) {
                toggleDropdown(dropdownContainer, false);
            }
        });
    };

    document.querySelectorAll('.dropdown_area').forEach((dropdownArea) => {
        dropdownArea.addEventListener('click', handleDropdownAreaClick);
    });

    document.querySelectorAll('.dropdown_list_item').forEach((item) => {
        item.addEventListener('click', () => handleDropdownListItemClick(item));
    });

    document.addEventListener('click', handleCloseOpenDropdowns);

});
