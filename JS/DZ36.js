$(function () {
    // Задача: создать список дел с возможность добавления/удаления пунктов
    let $list = $('#ul');
    let $newItemButton = $('#newItemButton');
    let $newItemForm = $('#newItemForm');
    let $itemDescription = $('#itemDescription');
    let $li = $('li');
//    let itemText = ''; // будет хранить текст из текстового поля

    // скрываем начальный список и затем плавно его выводом по элементно с задержкой
    $li.hide().each(function (index) {
        // delay - задержка перед первоначальным появление элемента
        // fadeIn - плавно повление, посредством изменения свойства opacity
        $(this).delay( 1000 * index).fadeIn(1000);
    });

    // показать количество дел
    function updateCounter() {
        $('#counter').text($('li').length);
    }

    updateCounter();

    // подготовка к добавлению элементов
    $newItemForm.hide();
    $('#showForm').on('click', (event) => {
        event.preventDefault(); // позволяет отменить стандартную функциональность элемента. Пример: если прописать e.preventDefault() для ссылки, то это отменит переход по ней по причине блокировки клика. НО в дальнейшем мы можем сделать свои действия по клику на объект (допустим строчки ниже)
        $newItemButton.hide();
        $newItemForm.show();
        $itemDescription.focus();
    });


    function addZero(a) {
        return (a < 10) ? `0${a}`: a;
    }

    // добавление нового элемента списка
    function addItem () {
        const text = $itemDescription.val().trim(); // берем значение атрибута value
        // .trim() - убирает пробелы, табуляцию, переносы на новую строку в начале и в конце строки
        if (text.length !== 0) {
            // append добавляет в конец
            // prepend добавляет в начало
           // $list.append(`<li>${text}</li>`);
            let date = new Date();
            let textDate = (`${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`);
            $list.append(`<li><p><span class="item">${text}</span><span class="date">${textDate}</span></p><img src="images/edit.png" class="edit" alt=""><img src="images/del.png" class="del" alt=""></li>`);
            $itemDescription.val('');
            updateCounter();
            $newItemButton.show();
            $newItemForm.hide();
        }
    }

    $("#add").on('click', addItem);

    $newItemForm.on('submit', function (e) {
        e.preventDefault();
        addItem ();
    });

    // удаление элементов
    $list.on('click', ".del", function () {
        let $elem  = $(this).parent("li");
        $elem.animate({ opacity: 0, paddingLeft: '+=100px', fontSize: '-=10px'}, 1500, 'swing', () => {
            $elem.remove();
            updateCounter();
        });
    });

    // редактирование элементов
    $list.on('click', ".edit", function () {
        let $elem = $(this).parent("li").find(".item");
        let $dateField = $(this).parent("li").find(".date");
        let $itemText = $elem.text();

        $elem.attr('contentEditable','true');
        $elem.focus();
        $elem.on('keypress', function (e) {
            if (e.which === 13) {
                e.preventDefault();
                $elem.attr('contentEditable','false');
                $elem.blur();
                let date = new Date();
                $dateField.text(`${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`);
                $itemText = $elem.text();
            }
        });
        $(document).on('mouseup', function (e) {
            if (!$elem.is(e.target) && $elem.has(e.target).length === 0) {
                $elem.text($itemText);
                $elem.attr('contentEditable','false');
            }
        });
    });

    // удаление элементов. при первом нажатии на элемент мы делаем его красным цветом и помещаем в конце списка. при повторном нажатии мы удаляем элемент
/*    $list.on('click', 'li', function () {
        let $elem  = $(this); // кэширую элемент. т.е. сохраняю нажатый и его состояние
        let $complete = $elem.hasClass('complete'); // проверяем, есть ли у элемента класс complete. возвращает true/false
        if($complete) {
            $elem.animate({ opacity: 0, paddingLeft: '+=180px'}, 1500, 'swing', () => {
                $elem.remove();
                updateCounter();
            });
        } else {
            itemText = $elem.text(); // беру текст из нажатого эл. списка
            $elem.remove();
            // добавление в конце списка с классом compelete
            $list.append(`<li class="complete">${itemText}</li>`).hide().fadeIn(1500);
        }
    })*/

    $('#hand1').on('mousedown', function () {
        $('#hand1').css("display", "none");
        $('#hand2').css("display", "block");
    });
    $('#hand2').on('mouseup', function () {
        $('#hand2').css("display", "none");
        $('#hand1').css("display", "block");
    });
});