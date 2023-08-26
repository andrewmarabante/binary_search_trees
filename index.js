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
                return null;
            }
            if (data === node.data)
            {
                if (node.left ===null && node.right ===null)
                {
                    //working
                    return null;
                }
                if (node.left === null)
                {
                    //working
                    return node.right;
                }
                if (node.right === null)
                {
                    //this code will only get called if I add new nodes since the balanced 
                    //serach tree won't allow left nodes without right nodes
                    return node.left;
                }
                if(node.left!==null && node.right!==null)
                {
                    let tempNode = node.right;
                    while(tempNode.left!==null)
                    {
                        tempNode = tempNode.left;
                    }
                    node.data = tempNode.data;
                    node.right= removeNode(node.right,tempNode.data);
                    return node;
                }
            }
            else if (value < node.data)
            {
                node.left = removeNode(node.left,data);
                return node;
            }
            else if (value > node.data)
            {
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

            array.push(node)

            if(node.right !== null)
            {
                inOrder(node.right)
            }
            return array;
        }
        if (func != null)
        {
        return func(inOrder(root));
        }
        else{return inOrder(root);}
    }

    preOrder(func)
    {        
        let root = this.root;
        let array = [];
        const preOrder = (node) =>
        {
            array.push(node);
            if(node.left !== null)
            {
            preOrder(node.left);
            }
            if(node.right !== null)
            {
            preOrder(node.right);
            }
            return array;
        }
        if (func != null)
        {
        return func(preOrder(root));
        }
        else{return preOrder(root);}
    }

    postOrder(func)
    {
        //In the process of solving inOrder I solved postOrder lol
        let root = this.root;
        let array = [];
        const postOrder = (node) =>
        {
            if(node.left !== null)
            {
            postOrder(node.left);
            }
            if(node.right !== null)
            {
            postOrder(node.right);
            }
            array.push(node);
            return array;
        }
        if (func != null)
        {
        return func(postOrder(root));
        }
        else{return postOrder(root);}
    }

    height(value)
    {
        let node = this.find(value);
        const findHeight = (node) =>
        {   
            if (node === null)
            {
                return -1;
            }
            let left = findHeight(node.left);
            let right = findHeight(node.right);
            return Math.max(left, right)+1;
        }
        return findHeight(node);
    }

    depth(value)
    {
        let root = newTree.root;
        let node = this.find(value);
        let dist = -1;
        const findDepth = (root,node) =>
        {
            if (root === null)
            {
                return -1;
            }
            if (root === node || (dist = findDepth(root.left, node)) >= 0 || (dist = findDepth(root.right, node)) >= 0)
            {
                return dist + 1;
            }
            return dist;
        }
        return findDepth(root,node);
    }

    isBalanced()
    {
        let root = newTree.root;
        const checkBalance = (root) =>
        {
            console.log('working')
            if (root === null || (root.left ===null && root.right ===null))
            {   
                console.log('null/1')
                return true;
            }
            if(Math.abs(this.height(root.left.data)-this.height(root.right.data))<1)
            {
                console.log('bal')
                return true;
            }
            else{ return false}
        }
        return checkBalance(root)
        console.log(root)
    }

    reBalance()
    {
        let array = this.breadthFirst();
        for (let i=0; i<array.length; i++)
        {
            this.remove(array[i])
        }
        console.log(newTree);
        this.root = buildTree(array);
        console.log(newTree)
        prettyPrint(newTree.root)
    }
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
newTree.add(3)
newTree.add(4)
prettyPrint(newTree.root)
newTree.reBalance();
//[2,1,5,6,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50]