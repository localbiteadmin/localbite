#!/usr/bin/env python3
content = open('localbite-postrun.js', encoding='utf-8').read()
old = 'console.log(`\\nLocalBite Post-Pipeline Script v3.0`);'
new = 'console.log(`\\nLocalBite Post-Pipeline Script v3.3`);'
count = content.count(old)
assert count == 1, f'Expected 1 match, got {count}'
open('localbite-postrun.js', 'w', encoding='utf-8').write(content.replace(old, new, 1))
print('Done.')
