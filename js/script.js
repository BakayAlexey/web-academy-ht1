const createCard = (data, i) => {
  const card = document.createElement('li');
  card.classList.add('card');
  card.style.transform = `translateX(${-(100 * i)}%)`;

  const cardImgWrap = document.createElement('div');
  cardImgWrap.classList.add('card-img');
  const img = document.createElement('img');
  img.setAttribute('src', data.img);
  img.setAttribute('alt', 'img');
  cardImgWrap.appendChild(img);
  card.appendChild(cardImgWrap);

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardDescrWrap = document.createElement('div');
  cardDescrWrap.classList.add('card-descr-wrapper');

  const cardTitle = document.createElement('div');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = data.title;
  cardDescrWrap.appendChild(cardTitle);

  const cardDescr = document.createElement('div');
  cardDescr.classList.add('card-descr');
  cardDescr.textContent = data.description;
  cardDescrWrap.appendChild(cardDescr);
  cardContent.appendChild(cardDescrWrap);

  const cardToggleDescr = document.createElement('button');
  cardToggleDescr.classList.add('card-toggle-descr');
  cardToggleDescr.setAttribute('type', 'button');
  cardToggleDescr.textContent = 'Toggle';
  cardContent.appendChild(cardToggleDescr);

  card.appendChild(cardContent);

  cardToggleDescr.addEventListener('click', () => {
    if (cardDescrWrap.classList.contains('opened')) {
      cardDescrWrap.style.height = cardTitle.getBoundingClientRect().height + cardDescr.getBoundingClientRect().height + 'px';
      cardDescrWrap.classList.remove('opened');
      cardDescrWrap.style.height = cardTitle.getBoundingClientRect().height + cardDescr.getBoundingClientRect().height + 'px';
    } else {
      cardDescrWrap.style.height = cardTitle.getBoundingClientRect().height + cardDescr.getBoundingClientRect().height + 'px';
      cardDescrWrap.classList.add('opened');
      cardDescrWrap.style.height = cardTitle.getBoundingClientRect().height + cardDescr.getBoundingClientRect().height + 'px';
    }
  });

  return card;
};

const createCardList = (cardsData) => {
  const cardNodes = [];
  let activeCard = 0;

  const cardListWrap = document.createElement('div');
  cardListWrap.classList.add('card-list-wrapper');

  const cardList = document.createElement('ul');
  cardList.classList.add('card-list');

  for (let i = 0; i < cardsData.length; i++) {
    const card = createCard(cardsData[i], i);
    cardList.appendChild(card);
    cardNodes.push(card);
  }
  cardNodes[activeCard].classList.add('active');
  cardListWrap.appendChild(cardList);

  const cardsNav = document.createElement('div');
  cardsNav.classList.add('cards-nav');

  const btnStart = document.createElement('button');
  btnStart.classList.add('cards-nav-start');
  btnStart.setAttribute('type', 'button');
  btnStart.textContent = '<<<';
  cardsNav.appendChild(btnStart);

  const btnPrev = document.createElement('button');
  btnPrev.classList.add('cards-nav-prev');
  btnPrev.setAttribute('type', 'button');
  btnPrev.textContent = '<';
  cardsNav.appendChild(btnPrev);

  const btnNext = document.createElement('button');
  btnNext.classList.add('cards-nav-next');
  btnNext.setAttribute('type', 'button');
  btnNext.textContent = '>';
  cardsNav.appendChild(btnNext);

  const btnEnd = document.createElement('button');
  btnEnd.classList.add('cards-nav-end');
  btnEnd.setAttribute('type', 'button');
  btnEnd.textContent = '>>>';
  cardsNav.appendChild(btnEnd);

  cardListWrap.appendChild(cardsNav);

  const root = document.querySelector('#root');
  root.appendChild(cardListWrap);

  btnStart.addEventListener('click', () => {
    if (activeCard === 0) return;

    cardNodes[activeCard].classList.remove('active');

    activeCard = 0;
    cardNodes[activeCard].classList.add('active');
  });

  btnEnd.addEventListener('click', () => {
    const lastIndex = cardNodes.length - 1;

    if (activeCard === lastIndex) return;

    cardNodes[activeCard].classList.remove('active');

    activeCard = lastIndex;
    cardNodes[activeCard].classList.add('active');
  });

  btnPrev.addEventListener('click', () => {
    cardNodes[activeCard].classList.remove('active');

    activeCard = ((activeCard - 1) < 0) ? (cardNodes.length - 1) : (activeCard - 1);
    cardNodes[activeCard].classList.add('active');
  });

  btnNext.addEventListener('click', () => {
    cardNodes[activeCard].classList.remove('active');

    activeCard = (activeCard + 1) % cardNodes.length;
    cardNodes[activeCard].classList.add('active');
  });
};

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/ads')
    .then(res => res.json())
    .then(
      cardsData => {
        if (cardsData && cardsData.length > 0) {
          createCardList(cardsData);
        }
      },
      error => {
        console.log(error);
      }
    );
});
