# ellipsis
Uses binary-search to calculate where to concatenate text with an ellipsis, based on its container.
In this proof-of-concept, each container is styled with a random width, height, font-size, and font-family to test a variety of scenarios.

Algorithm:

1. For each target-DIV, get original-string, inner-height, inner-width, font-size, and font-face
2. Split original-string into word-array
3. Set test-DIV to same inner-width, font-size and font-face of target-DIV. Inner-height is not set so DIV can grow vertically to get height of text.
4. Inject original-string into test-DIV
5. Set variable ellipsis to true, if inner-height of test-DIV exceeds inner-height of target-DIV, otherwise set ellipsis to false
6. If ellipsis is set to false, inject original-text into target-DIV (because it fits), then continue to next target-DIV, otherwise use binary search to find subset-text to fit with ellipsis
7. Set min to 0, max to array index of last word
8. Binary search start: Set mid to integer of min plus max divided by 2
9. Create test-string from word-array from 0 to mid-1, seperated by spaces, appended with ellipsis " ..."
10. Inject test-string into test-DIV, then get test-DIV inner-height
11. If test-height is greater than target-height, then set max to mid minus 1, otherwise set min to mid plus 1, and record test-string as new-string
12. Loop while min is less than or equal to max
13. When while loop ends, inject new-string into target-DIV
