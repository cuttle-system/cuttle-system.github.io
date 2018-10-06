
function construct_children(headings, i, parent) {
    let html = "";
    for (; i < headings.length; i++) {
        if (headings[i].tagName[1] <= parent.tagName[1]) break;
        if (parent.id !== '') headings[i].id = parent.id + '-' + headings[i].id;

        if (i < headings.length - 1 && headings[i].tagName[1] < headings[i + 1].tagName[1]) {
            html +=
                '<a class="navigation-link p-1 nav-link" ' + 'href="#' + headings[i].id + '">'
                + headings[i].innerText + '</a>'
                + '<nav class="nav nav-pills flex-column">'
            let result = construct_children(headings, i + 1, headings[i]);
            html += result.html + '</nav>';
            i = result.i;
        } else {
            html +=
                '<a class="navigation-link p-1 nav-link" ' + 'href="#' + headings[i].id + '">'
                + headings[i].innerText +
                '</a>';
        }
    }
    return {i: i - 1, html: html}
}


const navigation = document.querySelector("nav#_navigation-container");

if (navigation != null) {
    const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
    navigation.innerHTML += construct_children(headings, 0, {tagName: 'h0', id: ''}).html;
}
