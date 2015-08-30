# Foo

## Foo h2

Vivamus aliquam quam eu nunc eleifend, nec luctus mi sollicitudin. Donec porta, dui quis commodo vulputate, massa enim bibendum enim, at vulputate felis felis eget arcu. Fusce dui lectus, ullamcorper id ex semper, mattis tincidunt lorem. Morbi hendrerit eleifend imperdiet. Suspendisse a ipsum finibus, cursus metus non, faucibus est. Sed metus sem, interdum et luctus eu, tincidunt nec augue. Sed sollicitudin sapien purus, vitae iaculis purus semper id. Vestibulum pulvinar, erat nec lobortis auctor, sem lacus convallis magna, vitae rutrum urna nisi at arcu. Donec venenatis tellus eu elit dictum vehicula. In fermentum mauris viverra, aliquet urna ut, pharetra sem. Phasellus scelerisque felis in dui vestibulum, eu sodales ligula tempus. Curabitur ante nunc, scelerisque nec magna in, mattis pulvinar turpis.

Praesent vitae mi id quam pellentesque ultricies bibendum at velit. Duis vitae massa nec diam dignissim elementum ut porta est. Praesent ornare tempus urna, eget varius neque varius vel. Nunc vehicula in mi quis consequat. Sed vehicula diam nibh, et consectetur lorem cursus nec. Proin vel lorem ut orci scelerisque vehicula eget vitae lacus. Nulla vel congue justo. Aliquam nec diam tempor, elementum tellus vitae, eleifend neque. Nunc ultricies luctus lorem, sit amet suscipit velit volutpat a.

### Foo 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec condimentum enim, ut elementum nunc. Cras dictum arcu ac augue pharetra aliquet. Nullam blandit nisi mauris, euismod ultrices ipsum lobortis non. Vivamus vel mi viverra, porta quam at, condimentum quam. Nunc vel enim velit. Sed vestibulum orci ac lobortis faucibus. Mauris in tellus eu nulla eleifend euismod. Donec mi lectus, convallis at ornare et, eleifend non diam.

```js
var marked = require('marked')
  , highlight = require('highlight.js')
  , fs = require('fs')
  , renderer = new marked.Renderer()
```

#### Foo 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec condimentum enim, ut elementum nunc. Cras dictum arcu ac augue pharetra aliquet. Nullam blandit nisi mauris, euismod ultrices ipsum lobortis non. Vivamus vel mi viverra, porta quam at, condimentum quam. Nunc vel enim velit. Sed vestibulum orci ac lobortis faucibus. Mauris in tellus eu nulla eleifend euismod. Donec mi lectus, convallis at ornare et, eleifend non diam.

```php
public function test_getLastSnapshotWithOneSnapshots()
{
    $this->clientBuilder->setMethods(array('describeClusterSnapshots'));

    /** @var $redshiftClient \PHPUnit_Framework_MockObject_MockObject|RedshiftClient */
    $redshiftClient = $this->clientBuilder->getMock();

    $data = array(
        'Snapshots' => array(
            array(
                'ClusterIdentifier' => 'test-cluster',
                'SnapshotIdentifier' => 'test-snapshot-1',
                'SnapshotCreateTime' => '2015-03-25T01:00:00.000Z',
            ),
        ),
    );

    $redshiftClient
        ->expects($this->once())
        ->method('describeClusterSnapshots')
        ->withAnyParameters()
        ->willReturn(new Model($data));

    $snapshot = SnapshotHelper::getLastSnapshot($redshiftClient, 'test-cluster');

    $this->assertEquals(
        array(
            'ClusterIdentifier' => 'test-cluster',
            'SnapshotIdentifier' => 'test-snapshot-1',
            'SnapshotCreateTime' => '2015-03-25T01:00:00.000Z',
        ),
        $snapshot
    );
}
```