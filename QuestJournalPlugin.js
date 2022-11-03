Input.keyMapper["74"] = "questMenu";

_alias_scene_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _alias_scene_map_update.call(this);
    if(Input.isTriggered("questMenu")) SceneManager.push(Scene_QuestMenu);
}


function Scene_QuestMenu() {
    this.initialize.apply(this, arguments);
}

Scene_QuestMenu.prototype = Object.create(Scene_MenuBase.prototype);

Scene_QuestMenu.initialize =  function() {
    Scene_MenuBase.prototype.initialize.call(this);
}

Scene_QuestMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._questWindow = new Window_Quest((Graphics.boxWidth - 600) / 2,0);
    this._questWindow.select(0);
    this._questWindow.activate();
    this.addWindow(this._questWindow);
}

Scene_QuestMenu.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(Input.isTriggered("escape")) SceneManager.pop();
    if(Input.isTriggered("questMenu")) SceneManager.pop();
}

function Window_Quest() {
    this.initialize.apply(this, arguments);
}

Window_Quest.prototype = Object.create(Window_Selectable.prototype);
Window_Quest.prototype.constructor = Window_Quest;

Window_Quest.prototype.initialize = function(x,y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
}

Window_Quest.prototype.drawAllItems = function() {
    this.drawText("Aufgaben:", 0, 0, this.width, "center");
    this.drawText("eineAufgabe", 0, 34, this.width, "left");
    this.drawText("zweiteAufgabe", 0, 68, this.width, "left");

    Window_Selectable.prototype.drawAllItems.call(this);
}

Window_Quest.prototype.windowWidth = function() {
    return 600;
}

Window_Quest.prototype.windowHeight = function() {
    return this.fittingHeight(6);
}

Window_Quest.prototype.maxPageRows = function() {
    return 5;
}

Window_Quest.prototype.maxCols = function() {
    return 2;
}

Window_Quest.prototype.maxItems = function() {
    return 10;
}

Window_Quest.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + this.lineHeight();
    return rect;
};