function generateRandomId() {
	// Получаем текущий временной момент в виде строки
	let timestamp = Date.now().toString();

	// Генерируем случайные цифры
	let randomDigits = '';
	for (let i = 0; i < timestamp.length; i++) {
		randomDigits += Math.floor(Math.random() * 100).toString();
	}

	// Умножаем каждую цифру временной метки на соответствующую случайную цифру
	let multipliedTimestamp = '';
	for (let i = 0; i < timestamp.length; i++) {
		multipliedTimestamp += (parseInt(timestamp[i]) * parseInt(randomDigits[i])).toString();
	}

	// Получаем случайные 12 символов
	const multiplied = Array.from({ length: 12 }, () => multipliedTimestamp[Math.floor(Math.random() * multipliedTimestamp.length)]).join('');

	// Разбиваем на массив по два символа
	let splitTimestamp = multiplied.match(/.{1}/g);

	// Генерируем случайные символы
	let randomChars = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 24; i++) {
		randomChars += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	// Разбиваем случайные символы на массив по два символа
	let splitRandomChars = randomChars.match(/.{1,2}/g);

	// Объединяем массивы временной метки и случайных символов
	let mergedArray = splitRandomChars.map((v, i) => v + (splitTimestamp[i] || ""));

	// Перемешиваем объединенный массив
	let shuffledMergedArray = mergedArray.sort(() => Math.random() - 0.5).join('');

	// Разбиваем массив по девять символов и объединяем их через дефис
	const result = shuffledMergedArray.match(/.{1,9}/g).join('-');

	return result;
}

// Выводим результат работы функции
// console.log(generateRandomId());  // Пример вывода: "nS4no47c6-hy0em4A93-Ea0nQ0Qx2-9e0Xl4kX0"

module.exports = generateRandomId