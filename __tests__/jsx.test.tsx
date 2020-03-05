import Protobuf from '../src';
import { Feature, Point } from './fixtures/static_codegen/route_guide_pb';

describe('protobuf jsx', () => {
  it('nested object', () => {
    const point = {
      latitude: 123,
      longitude: 123,
    };
    const feature: Feature = (
      <Feature name="hello" location={<Point {...point} />}></Feature>
    );
    expect(feature.getLocation()?.toObject()).toMatchObject(point);
  });

  it('render in children', () => {
    const point = {
      latitude: 123,
      longitude: 123,
    };
    const feature: Feature = (
      <Feature name="hello">
        {() => ({
          location: <Point {...point} />,
        })}
      </Feature>
    );
    expect(feature.getLocation()?.toObject()).toMatchObject(point);
  });
});
