/* ============================================
   作品集网站交互脚本 - IE兼容版
   ============================================ */

window.onload = function () {

    /* ---- 1. 作品分类筛选 ---- */
    var workToggle = document.getElementById('workToggle');
    var grid = document.getElementById('grid');
    var filterBtns = document.getElementsByTagName('button');
    var cards = [];
    var allCards = document.getElementsByTagName('div');

    // 收集所有作品卡片
    for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].className && allCards[i].className.indexOf('card') >= 0 &&
            allCards[i].getAttribute('data-category')) {
            cards.push(allCards[i]);
        }
    }

    // 收起/展开作品
    if (workToggle) {
        workToggle.onclick = function () {
            if (grid.className.indexOf('collapsed') >= 0) {
                grid.className = grid.className.replace(' collapsed', '');
                workToggle.innerHTML = '收起作品 ▲';
            } else {
                grid.className += ' collapsed';
                workToggle.innerHTML = '展开作品 ▼';
            }
        };
    }

    // 分类筛选
    for (var i = 0; i < filterBtns.length; i++) {
        (function (btn) {
            if (btn.getAttribute('data-filter')) {
                btn.onclick = function () {
                    // 切换按钮状态
                    for (var j = 0; j < filterBtns.length; j++) {
                        if (filterBtns[j].getAttribute('data-filter')) {
                            filterBtns[j].className = 'filter-btn';
                        }
                    }
                    btn.className = 'filter-btn active';

                    var filter = btn.getAttribute('data-filter');
                    for (var k = 0; k < cards.length; k++) {
                        var cat = cards[k].getAttribute('data-category');
                        if (filter === 'all' || cat === filter) {
                            cards[k].className = cards[k].className.replace(' hide', '');
                        } else {
                            if (cards[k].className.indexOf('hide') < 0) {
                                cards[k].className += ' hide';
                            }
                        }
                    }
                };
            }
        })(filterBtns[i]);
    }

    /* ---- 2. 点击作品卡片 → 放大查看 ---- */
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('modalImg');
    var modalCaption = document.getElementById('modalCaption');
    var modalClose = document.getElementById('modalClose');

    for (var i = 0; i < cards.length; i++) {
        (function (card) {
            card.onclick = function () {
                var vlink = card.getAttribute('data-link');
                if (vlink) {
                    window.open(vlink, '_blank');
                    return;
                }
                var img = card.getElementsByTagName('img')[0];
                var title = '';
                var desc = '';
                var h3s = card.getElementsByTagName('h3');
                var ps = card.getElementsByTagName('p');
                if (h3s.length > 0) title = h3s[0].innerHTML;
                if (ps.length > 0) desc = ps[0].innerHTML;

                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalCaption.innerHTML = title + (desc ? ' — ' + desc : '');
                modal.className = 'modal show';
                document.body.style.overflow = 'hidden';
            };
        })(cards[i]);
    }

    function closeModal() {
        modal.className = 'modal';
        document.body.style.overflow = '';
    }
    if (modalClose) modalClose.onclick = closeModal;
    modal.onclick = function (e) {
        e = e || window.event;
        if (e.target === modal) closeModal();
    };
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode === 27 && modal.className.indexOf('show') >= 0) closeModal();
    };

    /* ---- 3. 导航链接平滑滚动 ---- */
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        (function (link) {
            var href = link.getAttribute('href');
            if (href && href.charAt(0) === '#') {
                link.onclick = function (e) {
                    var target = document.getElementById(href.substring(1));
                    if (target) {
                        e = e || window.event;
                        if (e.preventDefault) e.preventDefault();
                        window.scrollTo(0, target.offsetTop - 60);
                    }
                };
            }
        })(links[i]);
    }

    /* ---- 4. 图片加载失败处理 ---- */
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        (function (img) {
            img.onerror = function () {
                img.style.visibility = 'hidden';
            };
        })(imgs[i]);
    }

};
