/**
 * Created by Administrator on 2014/8/29.
 */

(function (global, fn) {

    'use strict';

    var DZCjs = function () {
    };

    $(document).ready(function () {
        fn.call(global, DZCjs);
    });

    //创建Dialog元素
    DZCjs.createDialog = function (id) {
        var dialog = $('<div data-role="dialog"></div>');
        if (id && id !== '')dialog.attr('id', id.toString());
        return  dialog;
    };

    // 创建Page元素
    DZCjs.createPage = function (id) {
        var page = $('<div data-role="page"></div>');
        if (id && id !== '')page.attr('id', id.toString());
        return  page;
    };

    // 创建Header元素
    DZCjs.createHeader = function (title) {
        title = title || '';
        var header = $('<div data-role="header" data-position="fixed"></div>');
        var headerTitle = $('<h1>' + title + '</h1>');
        header.append(headerTitle);
        return header;
    };

    // 创建Footer元素
    DZCjs.createFooter = function () {
        return $('<div data-role="footer" data-position="fixed" ></div>');
    };

    // 创建Content元素
    DZCjs.createContent = function () {
        return  $('<div data-role="content"></div>');
    };

    // 创建Listview元素
    DZCjs.createListview = function () {
        return $('<ul data-role="listview"></ul>');
    };

    // 为传入的元素添加内容
    DZCjs.addContent = function (container, name, description, icon) {
        if (icon && icon !== '')container.append('<img src="' + icon.toString() + '">');
        if (name && name !== '')container.append('<h3>' + name.toString() + '</h3>');
        if (description && description !== '')container.append('<span>' + description.toString() + '</span>');
        return container;
    };

    // 创建list元素子项
    DZCjs.createListItem = function (name, description, icon, link) {

        var li = $('<li></li>');
        var container = li;
        var a;

        if (link && link !== '') {
            a = $('<a href="' + link + '"></a>');
            li.append(a);
            container = a;
        }

        DZCjs.addContent(container, name, description, icon);

        return li;
    };

    // 创建可折叠集合
    DZCjs.createCollapsibleSet = function () {
        return  $('<div data-role="collapsible-set"></div>');
    };

    // 创建可折叠集合子项
    DZCjs.createCollapsibleItem = function (name, description, collapsed) {

        var item = $('<div data-role="collapsible"></div>');
        if (collapsed)item.attr('data-collapsed', 'true');
        else item.attr('data-collapsed', 'false');

        DZCjs.addContent(item, name, description);
        return item;
    };

    // 创建网格图或导航栏
    DZCjs.createNavbar = function () {
        return $('<div data-role="navbar"></div>');
    };

    // 创建列表
    DZCjs.createUl = function () {
        return $("<ul></ul>");
    };

    // 简单的元素事件监听
    DZCjs.listen = function (el, eventType, pageId, fn) {
        // 元素事件的绑定必须在pageinit之后。
        $(document).on('pageinit', pageId, function () {
            el = $(el);
            el.on(eventType, function (e) {
                fn.call(el, e);
            });
        });
    };

    // 简单的比例图
    DZCjs.createRateView = function (names, values, colors) {

        names = names || [];
        values = values || [];
        colors = colors || [];

        var view = $("<div></div>");
        var sum = 0;
        var i;
        var rate = 0;
        var color;

        for (i = 0; i < values.length; i++) {
            sum += values[i];
        }

        if (sum <= 0)return view.html('no data');

        for (i = 0; i < values.length; i++) {
            rate = values[i] / sum;
            color = colors[i] || 'red';

            view.append('<h3>' + names[i] + '(' + (rate * 100).toFixed(1) + '%)' + '</h3>');
            view.append('<div style="height:15px;width:' + rate * 100 + '%;background-color:' + color + '"></div>');
        }

        return view;
    };

    // 创建简单的Buttons group
    DZCjs.createBtnGroup = function () {
        return $('<div data-role="controlgroup" data-type="horizontal">');
    };

    // 创建简单的按钮
    DZCjs.createBtn = function (name, link, icon) {

        var btn;

        if (link && link !== '') {
            btn = $('<a href="' + link + '"data-role="button"></a>');
        }
        else {
            btn = $('<a href="#" data-role="button"></a>');
        }

        if (icon && icon !== '')btn.attr('data-icon', icon);

        return btn.html(name);
    };

})(this, function (DZCjs) {

    'use strict';

    // 创建首页
    var createHomePage = function () {

        // Config
        var title = '德州城3G官网';
        var nameList = [
            '楼盘简介',
            '全景户型',
            '会员专区',
            '楼盘相册',
            '楼盘印象',
            '投票活动',
            '一键导航',
            '联系我们'
        ];
        var descriptionList = [
            'Property description',
            'Panoramic apartment',
            'Member area',
            'Property album',
            'Property impression',
            'Voting',
            'A key navigation',
            'Contact us'
        ];
        var linkList = [
            '#intro',
            '#panorama',
            '#member',
            '#album',
            '#impression',
            '#vote',
            'http://map.baidu.com/mobile/webapp/place/linesearch/foo=bar/end=word%3D%E5%BE%B7%E6%B4%B2%E5%9F%8E%26point%3D12738278.200000001%2C2585936.7%26citycode%3D340&from=place',
            '#contact'
        ];
        var iconList = [
            'resource/images/icons-png-dzc/property-description.png',
            'resource/images/icons-png-dzc/panoramic-apartment.png',
            'resource/images/icons-png-dzc/member-area.png',
            'resource/images/icons-png-dzc/property-album.png',
            'resource/images/icons-png-dzc/property-impression.png',
            'resource/images/icons-png-dzc/voting.png',
            'resource/images/icons-png-dzc/a-key-navigation.png',
            'resource/images/icons-png-dzc/contact-us.png'
        ];

        // Elements
        var home = DZCjs.createPage('home');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        var uList = DZCjs.createListview();
        var listItem;

        for (var i = 0; i < nameList.length; i++) {
            listItem = DZCjs.createListItem(nameList[i], descriptionList[i], iconList[i], linkList[i]);
            uList.append(listItem);
        }

        // layout
        content.append(uList);
        home.append(header, content);

        return home;
    };

    // 楼盘介绍页
    var createIntroPage = function () {
        // Config
        var title = '楼盘介绍';
        var nameList = [
            '楼盘介绍',
            '地图',
            '项目简介',
            '项目配套'
        ];
        var descriptionList = [
            '惠州大亚湾德洲投资有限公司',
                '<a href="http://api.map.baidu.com/marker?location=22.756616,114.428661&amp;title=德洲城&amp;content=深圳市坪山新区丹梓大道东&amp;output=html&amp;src=weiba|weiweb">' +
                '<img style="background: url(http://api.map.baidu.com/staticimage?center=114.428661,22.756616&amp;zoom=12&amp;markers=114.428661,22.756616&amp;width=640&amp;height=75&amp;markerStyles=m,) 0% 0% no-repeat;" width="600" height="75">' +
                '</a>',
            '2012年，荣获2012年度中国地产十大最具影响力区域标杆楼盘',
            '<strong>318</strong>：澳头至淡水海关，途径徳洲城。'
        ];

        // Elements
        var intro = DZCjs.createPage('intro');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        var collapsibleList = DZCjs.createCollapsibleSet();
        var listItem;

        for (var i = 0; i < nameList.length; i++) {
            listItem = DZCjs.createCollapsibleItem(nameList[i], descriptionList[i], i !== 0);
            collapsibleList.append(listItem);
        }

        // layout
        content.append(collapsibleList);
        intro.append(header, content);

        return intro;
    };

    // 创建全景图
    var createPanoramaDialog = function () {

        // Config
        var title = '全景图';

        // Elements
        var dialog = DZCjs.createDialog('panorama');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();

        // Layout
        content.append('<div id="panoramaImg" style="background:url(resource/images/icons-png-dzc/demo-photo.jpg);height:512px"></div>');
        dialog.append(header, content);

        var lastX = false;
        var lastY = false;
        var bkPosX = 0;
        var isPressed = false;

        // Logic
        DZCjs.listen('#panoramaImg', 'vmousedown', '#panorama', function () {
            isPressed = true;
        });

        DZCjs.listen('#panoramaImg', 'vmouseup', '#panorama', function () {
            isPressed = false;
            lastX = false;
            lastY = false;
        });

        DZCjs.listen('#panoramaImg', 'vmouseout', '#panorama', function () {
            isPressed = false;
            lastX = false;
            lastY = false;
        });

        DZCjs.listen('#panoramaImg', 'vmousemove', '#panorama', function (e) {
            if (!isPressed)return;

            var x = e.pageX;

            if (!lastX) {
                lastX = x;
                return;
            }

            var dx = x - lastX;
            lastX = x;
            bkPosX += dx;

            $(this).css('background-position', bkPosX + 'px 0');
        });

        return dialog;
    };

    // 保存指引图片
    var viewerSrc = '';

    // 创建预览视图
    var createViewerPage = function () {

        // Config
        var title = '图片预览';

        // Elements
        var viewer = DZCjs.createPage('viewer');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        header.attr('data-fullscreen', true);
        header.attr('data-add-back-btn', true);
        header.attr('data-back-btn-text', '后退');
        content.attr('class', 'viewer');

        // Layout
        content.append('<img>');
        viewer.append(header, content);

        // Logic
        var adapterImg = function (container, img) {

            if (img.height() > container.height()) {
                img.height('100%');
                img.width('auto');
            }
            else if (img.width() > container.width()) {
                img.width('100%');
                img.height('auto');
            }

            var marginTop = (content.height() - img.height()) / 2;
            img.css('margin-top', marginTop + 'px');
        };

        DZCjs.listen(viewer, 'pageshow', '#viewer', function (e) {

            var img = $('#viewer img');
            img.attr('src', viewerSrc);

            img.on('load', function () {
                adapterImg(content, img);
            })
        });

        // 元素事件的绑定必须在pageinit之后。
        $(document).on('pageinit', '#viewer', function () {
            window.onorientationchange = window.onresize = function () {
                var img = $('#viewer img');
                adapterImg(content, img);
            }
        });

        return viewer;
    };

    // 创建楼盘相册页
    var createAlbumPage = function () {

        // Config
        var title = '楼盘相册';

        // Elements
        var album = DZCjs.createPage('album');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();

        var gallery = $('<div id="Gallery"></div>');
        var column1 = $('<div class="gallery-item"></div>');
        var column2 = $('<div class="gallery-item"></div>');
        var column3 = $('<div class="gallery-item"></div>');

        var i, path, column;

        // Layout
        for (i = 1; i < 12; i++) {

            if (i % 3 === 1)column = column1;
            else if (i % 3 === 2)column = column2;
            else column = column3;

            path = 'resource/images/icons-png-dzc/gallery/' + i + '.jpg';
            column.append('<img src="' + path + '"/>');
        }

        gallery.append(column1, column2, column3);
        content.append(gallery);
        album.append(header, content);

        DZCjs.listen('#Gallery img', 'vclick', '#album', function (e) {
            e.preventDefault();
            viewerSrc = $(e.target).attr('src');
            $.mobile.changePage('#viewer');
        });

        return album;
    };

    // 创建会员专区页
    var createMemberAreaPage = function () {

        // Config
        var title = '德州城会员';

        var nameList_1st = [
            '消费总额',
            '剩余积分',
            '剩余金额'
        ];
        var value_1st = [
            '0元',
            '64分',
            '0元'
        ];

        var nameList_2nd = [
            '最新通知',
            '会员卡特权',
            '积分兑换活动'
        ];
        var descriptionList_2nd = [
            '会员可优先看房',
            '免费专车接送',
            '精美小礼品'
        ];

        var nameList_3rd = [
            '签到赚积分',
            '个人资料',
            '会员卡说明',
            '地址: 深圳市坪山新区丹梓大道东',
            '电话: 0752-5281888'
        ];

        var link_3rd = [

        ];

        // Elements
        var dialog = DZCjs.createPage('member');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        var listItem, i;

        // 1st Part
        var infoBar = DZCjs.createNavbar();
        var infoList = DZCjs.createUl();

        for (i = 0; i < nameList_1st.length; i++) {
            listItem = DZCjs.createListItem(nameList_1st[i], value_1st[i], false, '#');
            infoList.append(listItem);
        }

        infoBar.append(infoList);

        // 2nd part
        var collapsibleList = DZCjs.createCollapsibleSet();

        for (i = 0; i < nameList_1st.length; i++) {
            listItem = DZCjs.createCollapsibleItem(nameList_2nd[i], descriptionList_2nd[i], i !== 0);
            collapsibleList.append(listItem);
        }


        // 3rd part
        var clickableList = DZCjs.createListview();

        for (i = 0; i < nameList_1st.length; i++) {
            listItem = DZCjs.createListItem(nameList_3rd[i], false, false, link_3rd[i]);
            clickableList.append(listItem);
        }

        // Layout
        content.append(infoBar, collapsibleList);
        dialog.append(header, content);

        return dialog;
    };

    // 创建楼盘印象页
    var createImpressionPage = function () {

        // config
        var title = '楼盘印象';
        var values = [25, 45, 15, 15];
        var names = ['配套齐全', '居家首选', '交通便利', '环境优雅'];
        var colors = ['#C66', '#C96', '#CC6', '#CF6'];

        // Elements
        var page = DZCjs.createPage('impression');
        var header = DZCjs.createHeader(title);
        var footer = DZCjs.createFooter();
        var btnGroup = DZCjs.createBtnGroup();
        var fBtn_1 = DZCjs.createBtn('专家点评', '#review', 'forward');
        var fBtn_2 = DZCjs.createBtn('添加印象', '#', 'plus');
        var content = DZCjs.createContent();
        var view = DZCjs.createRateView(names, values, colors);

        // Layout
        btnGroup.append(fBtn_1, fBtn_2);
        footer.append(btnGroup);
        content.append(view);
        page.append(header, content, footer);

        return page;
    };

    // 创建专家点评页
    var createReviewDialog = function () {

        // config
        var title = '专家点评';

        // Elements
        var dialog = DZCjs.createDialog('review');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        var introContent = $('<div style="position: relative; background-color: #595959; color: whitesmoke; padding: 5px; text-shadow: none"></div>');
        var reviewContent = $('<div style="position: relative; background-color: #26292B; color: whitesmoke;padding: 5px; text-shadow: none"></div>');

        // Layout
        reviewContent.append('<img src="resource/images/icons-png-dzc/member-area.png" style="float: left; width: 80px; height: 80px;">');
        reviewContent.append('<h3>某专家</h3>');
        reviewContent.append('<b style="color: orange">某建筑设计工程师</b>');
        reviewContent.append('<p>建筑设计师是指单纯的建筑专业的设计师，简称建筑师</p>');

        introContent.append('<h3>专家点评</h3>');
        introContent.append('<p>建筑设计是指建筑物在建造之前，设计者按照建设任务，把施工过程和使用过程中所存在的或可能发生的问题，事先作好通盘的设想，拟定好解决这些问题的办法、方案，用图纸和文件表达出来</p>');

        content.append(reviewContent, introContent);
        dialog.append(header, content);

        return dialog;
    };

    // 创建投票页
    var createVotingPage = function () {

        // Config
        var title = '投票活动';
        var radioNames = ['很好', '普通', '不好'];
        var radioValue = ['good', 'normal', 'bad'];

        var values = [1, 1, 1];
        var colors = ['#C66', '#C96', '#CC6'];

        // Elements
        var vote = DZCjs.createPage('vote');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();
        var form = $('<form></form>')
        var formset = $('<div></div>');
        var view;
        var btn = $('<button>提交</button>');
        var i;

        // Layout
        for (i = 0; i < radioNames.length; i++) {

            formset.append('<label for="' + radioValue[i] + '">' + radioNames[i] + '</label>');
            formset.append('<input type="radio"' + (i === 0 ? 'checked="checked"' : '') + ' name="vote" id="' + radioValue[i] + '" value="' + i + '">');
        }

        form.append(formset);
        content.append(form, btn);
        vote.append(header, content);

        // Logic
        DZCjs.listen(btn, 'vclick', '#vote', function () {

            var on = $('label.ui-radio-on');
            var id = on.attr('for');
            var value = $('input#' + id).val();

            values[value]++;

            formset.css('display', 'none');
            btn.css('display', 'none');

            view = DZCjs.createRateView(radioNames, values, colors);
            content.append(view);
        });

        return vote;

    };

    // 创建一键导航页
    // 该页为跳转页

    // 创建联系我们页
    var createContactDialog = function () {
        var title = '联系我们';
        var p = '项目位于坪山新区丹梓大道东';
        var dialog = DZCjs.createDialog('contact');
        var header = DZCjs.createHeader(title);
        var content = DZCjs.createContent();

        content.html(p);
        dialog.append(header, content);

        return dialog;
    };


    // 添加页面
    var homePage = createHomePage();
    var contactDialog = createContactDialog();
    var memberAreaPage = createMemberAreaPage();
    var introPage = createIntroPage();
    var panoramaDialog = createPanoramaDialog();
    var impressionPage = createImpressionPage();
    var reviewDialog = createReviewDialog();
    var albumPage = createAlbumPage();
    var viewerPage = createViewerPage();
    var votePage = createVotingPage();
    $('body').append(homePage, introPage, panoramaDialog, albumPage, memberAreaPage, impressionPage, votePage, reviewDialog, contactDialog, viewerPage);
});