function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(
    (book) => !book.borrows[0].returned
  ).length;
}

// helper
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) return -1;
    if (obj[keyB] > obj[keyA]) return 1;
    return 0;
  });
}

// NOTE: DO NOT EDIT BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});
  const sorted = _sortObjectByValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (!acc[authorId]) acc[authorId] = 0;
    acc[authorId] += borrows.length;
    return acc;
  }, {});
  const sorted = _sortObjectByValues(count);
  return sorted
    .map((authorId) => {
      const { name: { first, last } } = authors.find(({ id }) => id === Number(authorId));
      return { name: `${first} ${last}`, count: count[authorId] };
    })
    .slice(0, 5);
}

// Browser-safe version
window.getTotalBooksCount = getTotalBooksCount;
window.getTotalAccountsCount = getTotalAccountsCount;
window.getBooksBorrowedCount = getBooksBorrowedCount;
window.getMostCommonGenres = getMostCommonGenres;
window.getMostPopularBooks = getMostPopularBooks;
window.getMostPopularAuthors = getMostPopularAuthors;
