parsetabs = function(tabs,parent,sub){
    if (!sub) {
        var $nav = $(document.createElement('div')).addClass('main navigation'),
            $navtabs = $(document.createElement('ul')).addClass('tablist'),
            $content = $(document.createElement('div')).addClass('content');
            $nav.append($navtabs)
            $('#container').append($nav).append($content);
    } else {
        var $nav = $(document.createElement('div')).addClass('sub navigation'),
            $navtabs = $(document.createElement('ul')).addClass('tablist'),

            $content = $(document.createElement('div')).addClass('content hastabs');
            $nav.append($navtabs);
            parent.append($nav).append($content);

    }

    for (tabId in tabs) {
        var tabData = tabs[tabId]

        var title = tabData.title||tabId

        var id = parent?parent.attr('id')+tabId:tabId
        $navtabs.append('<li><a data-tab="#'+id+'"><span>'+title+'</span></a></li>');

        var $tabContent = $(document.createElement('div')).addClass('tab').attr('id',id);

        if (tabData.tabs) {
            parsetabs(tabData.tabs,parent=$tabContent,sub=true);
        } else {
            parsewidgets(tabData.widgets,$tabContent)
        }

        $content.append($tabContent);
        // console.log('OK parsing tab ' + title )

    }
}

__widgets__ = {}
__widgetsIds__ = {}

parsewidgets = function(widgets,parent) {

    for (widgetId in widgets) {
        var widgetData = widgets[widgetId]

        var color = widgetData.color?'style="background:'+widgetData.color+'"':'';
        var title = widgetData.title || widgetId;
        var type = widgetData.type || 'fader'
        widgetData.path = widgetData.path || '/' + widgetId

        var widget = $('\
            <div class="widget" widgetType="'+type+'" widgetId="'+widgetId+'" path="'+widgetData.path+'">\
                <div class="title" '+color+'>'+title+'</div>\
            </div>\
        ');

        // create widget
        var widgetInner = createWidget[type](widgetData,parent)
        widgetInner.type =  type

        // store widget reference for cross widget sync
        widget.append(widgetInner)
        if (__widgets__[widgetId]==undefined) {
            __widgets__[widgetId] = []
        }
        __widgets__[widgetId].push(widgetInner)

        // store path vs widget id for faster cross-app sync
        __widgetsIds__[widgetData.path ] = widgetId

        parent.append(widget);
    }
}
