var BinarySearchTree = function(key, value, parent) {
    this.key = key || null;
    this.value = value || null;
    this.parent = parent || null;
    this.left = null;
    this.right = null;
};

BinarySearchTree.prototype.insert = function(key, value) {
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }
    else if (key < this.key) {
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        else {
            this.left.insert(key, value);
        }
    }
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
};

BinarySearchTree.prototype.get = function(key) {
    if (this.key == key) {
        return this;
    }
    else if (key < this.key && this.left) {
        return this.left.get(key);
    }
    else if (key > this.key && this.right) {
        return this.right.get(key);
    }
    else {
        throw new Error('Key Error');
    }
};

BinarySearchTree.prototype.remove = function(key) {
    if (this.key == key) {
        if (this.left && this.right) {
            var successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        else if (this.left) {
            this._replaceWith(this.left);
        }
        else if (this.right) {
            this._replaceWith(this.right);
        }
        else {
            this._replaceWith(null);
        }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
};

BinarySearchTree.prototype._replaceWith = function(node) {
    if (this.parent) {
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        else if (this == this.parent.right) {
            this.parent.right = node;
        }

        if (node) {
            node.parent = this.parent;
        }
    }
    else {
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
    }
};

BinarySearchTree.prototype._findMin = function() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
};


// Write an algorithm to check whether an arbitrary tree is a binary search tree
// assume node.middle != null only if node.left != null && node.right != null

let binarySearchCheck = (node) => {
    if (node.middle) {
        return false;
    } else {
        if (node.left) {
            if (node.left.key > node.key) {
                return false;
            }

            if (!binarySearchCheck(node.left)) {
                return false;
            } 
            
            if (node.right) {
                if (node.right.key < node.key) {
                    return false;
                }
                return binarySearchCheck(node.right);
            }
        }
        return true;
    }
}


// Write an algorithm to find the height of a binary search tree
let binaryHeight = (node) => {
    let leftHeight =  1;
    let rightHeight = 1;

    if (node.left || node.right) {
        if (node.left) {
            leftHeight += binaryHeight(node.left);
        }
        if (node.right) {
            rightHeight += binaryHeight(node.right);
        }
        return (leftHeight > rightHeight) ? leftHeight : rightHeight;
    }
    return 1;
}


// Write an algorithm to find the third largest value in a binary search tree
let thirdLargestValue = (node, values) => {
    let binaryValues = values || [];
    binaryValues.push(node.value);
    let tempLeftValue, tempRightValue;

    if (node.left || node.right) {
        if (node.left) {
            tempLeftValue = thirdLargestValue(node.left, binaryValues);
        }
        if (node.right) {
            tempRightValue = thirdLargestValue(node.right, binaryValues);
        }
    } else {
        if (tempLeftValue) {
            binaryValues.concat(tempLeftValue);
        }
        if (tempRightValue) {
            binaryValues.concat(tempRightValue);
        }
    }
    if (node.parent === null) {
        console.log(binaryValues.sort());
        binaryValues.sort();
        return binaryValues[binaryValues.length - 3];
    } else {
        return binaryValues;
    }
}


//Basic string padding functions
function lpad(str, wid) {
    return (" ".repeat(wid) + str).slice(-wid);
}

function rpad(str, wid) {
    return (str + " ".repeat(wid)).slice(0, wid);
}

function cpad(str, wid) {
    var tmp = " ".repeat(wid) + str + " ".repeat(wid);
    var start = Math.floor(tmp.length/2 - wid/2);
    return tmp.slice(start, start + wid);
}

//Render a tree to an array of strings
function render(tree) {
    var key = "" + tree.key;
    if (!tree.left && !tree.right) return [key];
    var left = tree.left ? render(tree.left) : [];
    var right = tree.right ? render(tree.right) : [];
    var lwid = left.reduce((w,l) => Math.max(w, l.length), 0) + 1;
    var rwid = right.reduce((w,l) => Math.max(w, l.length), 0) + 1;
    var spare = tree.key.length - lwid - rwid; //See if we need more room
    if (spare > 0) {
        lwid += Math.ceil(spare / 2);
        rwid += Math.ceil(spare / 2);
    }
    var ret = [cpad(tree.key, lwid + rwid + 1)];
    for (var i = 0; i < left.length || i < right.length; ++i)
        ret.push(lpad(left[i]||"", lwid) + " " + rpad(right[i]||"", rwid));
    return ret;
}

//Display a tree on the console.
function display(tree) {
    for (var line of render(tree)) console.log(line + "|");
}

//Construct a tree
function tree(val) {
    return {key: val, left: null, right: null};
}
function add(node, val) {
    while (1) {
        var dir = val < node.key ? "left" : "right";
        if (!node[dir]) return node[dir] = tree(val);
        node = node[dir];
    }
}

//Example usage
var t = tree(8);
for (var n of [3, 1, 6, 4, 7, 10, 14, 13]) add(t, n);

display(t);

