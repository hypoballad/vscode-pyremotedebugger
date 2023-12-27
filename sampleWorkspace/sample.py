# sample remote-pdb code

print('hello world1')
from remote_pdb import RemotePdb
RemotePdb('127.0.0.1', 4444).set_trace()
print('hello world2')
print('hello world3')
print('hello world4')