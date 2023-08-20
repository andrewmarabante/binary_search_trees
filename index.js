class Node
{
    constructor(data = null, left = null, right = null)
    {
        this.data = data;
        this.left = left;
        this.right = right
    }
}

class tree
{
    constructor(array = [null])
    {
        if(Array.isArray(array))
        {
            this.root = buildTree(array);
        }
        else{console.log('Not an Array')}
    }

    add(value)
    {
       const node = this.root;
       if (node.data === null)
       {
            this.root = new Node(value);
       }
       const search = (node) =>
       {
            if(value<node.data)
            {
                if(node.left === null)
                {
                    node.left = new Node(value);
                    return;
                }
                else if(node.left != null)
                {
                    return search(node.left);
                }
            }
            else if(value>node.data)
            {
                if(node.right === null)
                {
                    node.right = new Node(value);
                    return;
                }
                else if(node.right != null)
                {
                    return search(node.right);
                }
            }
            else{
                return null
            }
       }
    return search(node);
    }

    remove(value)
    {
        //working
        const removeNode = (node, data) =>
        {
            if (node === null)
            {
                console.log('null')
                return null;
            }
            if (data === node.data)
            {
                console.log('foundnode')
                if (node.left ===null && node.right ===null)
                {
                    console.log('bothnull')
                    //working
                    return null;
                }
                if (node.left === null)
                {
                    console.log('leftnull')
                    //working
                    return node.right;
                }
                if (node.right === null)
                {
                    //this code will only get called if I add new nodes since the balanced 
                    //serach tree won't allow left nodes without right nodes
                    console.log('rightnull')
                    return node.left;
                }
                if(node.left!==null && node.right!==null)
                {
                    console.log('bothNotnull')
                    let tempNode = node.right;
                    while(tempNode.left!==null)
                    {
                        tempNode = tempNode.left;
                    }
                    node.data = tempNode.data;
                    console.log(node.right)
                    console.log(tempNode.data)
                    node.right= removeNode(node.right,tempNode.data);
                    return node;
                }
            }
            else if (value < node.data)
            {
                console.log('less')
                node.left = removeNode(node.left,data);
                return node;
            }
            else if (value > node.data)
            {
                console.log('more')
                node.right = removeNode(node.right,data);
                return node;
            }
        }
        this.root = removeNode(this.root, value);
    }

    find(value)
    {
        const search = (node, value) =>
        {
            if(value === node.data)
            {
                return node;
            }
            else if(value < node.data && node.left!== null)
            {
                return search(node.left,value);
            }
            else if(value > node.data && node.right!== null)
            {
                return search(node.right, value);
            }
            else{return 'Not In Tree'}
        }
        return search(this.root, value);
    }

    breadthFirst(func)
    {
        let root = this.root;
        const breadth = (node) =>
        {
        const array = [];
        const queu = [node];
        while(queu.length > 0)
        {
            const curr = queu.shift();
            array.push(curr.data);
            if (curr.left !== null)
            {   
            queu.push(curr.left)
            }
            if (curr.right !== null)
            {
            queu.push(curr.right)              
            }
        }
        if (func != null)
        {
        return func(array);
        }else{
            console.log(array)
            return array;
        }
        }
        return breadth(root);
    }

    inOrder(func)
    {
        let root = this.root;
        let array = [];
        const inOrder = (node) =>
        {
            if(node.left !== null)
            {
            inOrder(node.left);
            }
            if(node.right !== null)
            {
            inOrder(node.right);
            }
            array.push(node);
            return array;
        }
        return inOrder(root);
    }

    preOrder()
    {        
        let root = this.root;
        let array = [];
        const inOrder = (node) =>
        {
            array.push(node);
            if(node.left !== null)
            {
            inOrder(node.left);
            }
            if(node.right !== null)
            {
            inOrder(node.right);
            }
            return array;
        }
        return inOrder(root)
    }

    postOrder()
    {
        //In the process of solving inOrder I solved postOrder lol
        let root = this.root;
        let array = [];
        const inOrder = (node) =>
        {
            if(node.left !== null)
            {
            inOrder(node.left);
            }
            if(node.right !== null)
            {
            inOrder(node.right);
            }
            array.push(node);
            return array;
        }
        return inOrder(root);
    }
}

function someFunc(input)
{
    console.log(input)
}

function buildTree(array, start = 0, end = array.length-1)
{
    array = mergeSort(array);
    if (start>end){return null};
    let mid = Math.floor((start+end)/2);
    let root = new Node(array[mid]);
    root.left = (buildTree(array,start,mid-1));
    root.right = (buildTree(array,mid+1,end));
    return root;
}

const mergeSort = (array) =>
{
    if (array.length === 0)
    {
        return ('invalid')
    }
    else if (array.length === 1)
    {
        return array;
    }
    else 
    {
        const left = array.slice(0,Math.floor(array.length/2));
        const right = array.slice(Math.floor(array.length/2), array.length);
        return merge(mergeSort(left), mergeSort(right))     
    }
}

function merge(left, right)
{
    const merge =[];
    let li = 0;
    let ri = 0;
    while(left.length > li && right.length > ri)
    {
        if (left[li] < right[ri])
        {
            merge.push(left[li])
            li++
        }
        else
        {
            merge.push(right[ri])
            ri++
        }
    }
    while(left.length > li)
    {
        merge.push(left[li])
        li++
    }
    while(right.length > ri)
    {
        merge.push(right[ri])
        ri++
    }

    return merge;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const newTree = new tree([2,1,5,6,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50])
prettyPrint(newTree.root)
console.log(newTree.inOrder());
//[2,1,5,6,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50]