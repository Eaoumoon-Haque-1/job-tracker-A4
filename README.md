# job-tracker-A4-main

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?


Answers:
1.  getElementBy id returns a particular element using id or returns null if empty
    getElemetsByClassName returns all the matching elements based on class as a Html collection. its array like.
    query selector selects the first matching element where as querySelectorAll selects all matching elements

2. const p = document.CreateElement('p')
    p.innerText("Hello, How are you")
    document.body.appendChild("p")

3. Event bubbling is a phenomenon when something happens to a child and than it propagates upward to its parents and grandparents.

4. Instead of adding event listener to many child elements,we add one listener to the parent and use bubbling. 
    it's useful because we dont need to add listeners on every elemts and later catch it one by one.

5. preventDefault() Stops the browser’s default behavior for an element.

    stopPropagation() Stops the event from bubbling up