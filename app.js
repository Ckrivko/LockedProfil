function lockedProfile() {
    let mainEl = document.getElementById('main')

    async function getDat() {

        let res = await fetch('http://localhost:3030/jsonstore/advanced/profiles')
        let data = await res.json();

        return await data;

    }

    let data = getDat();

    data.then(res => {

        Object.values(res).forEach(el => {

            makeUser(el)

        })

        let userOne = mainEl.childNodes[0];

        userOne.remove();


    });

    function makeUser(data) {

        let username = data.username;
        let email = data.email;
        let age = data.age;

        let userOne = mainEl.children[0];
        let cloneUser = userOne.cloneNode(true);
        //userOne.remove();

        let hiddenEl = cloneUser.querySelector('#user1HiddenFields')
        let nameEl = cloneUser.querySelector("input[name='user1Username']");
        let emailEl = cloneUser.querySelector("input[name='user1Email']");
        let ageEl = cloneUser.querySelector("input[name='user1Age']");


        nameEl.value = username;
        emailEl.value = email;
        ageEl.value = age;

        let btnEl = cloneUser.querySelector('button')

        btnEl.addEventListener('click', (e) => {
            let profile = e.target.parentElement
            let lockEl = profile.querySelector('input[type="radio"]:checked');
            let btnEl = e.target;


            if (lockEl.value !== 'unlock') {

                return;
            }
            else if (lockEl.value === 'unlock') {

                e.target.disabled = false;
            }
            btnEl.textContent = btnEl.textContent === 'Show More'
                ? 'Hide it'
                : 'Show more'

            hiddenEl.style.display = hiddenEl.style.display === 'block'
                ? 'none'
                : 'block'

        })


        mainEl.appendChild(cloneUser)
    }





}

lockedProfile();



